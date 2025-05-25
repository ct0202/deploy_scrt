import React, { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { AGORA_APP_ID } from "../../config";
import AgoraRTC from 'agora-rtc-sdk-ng';
import { Navigation } from "../../components/shared/Navigation";
import DayLimit from "../../components/shared/DayLimit";
import PresentsShop from "../../components/shared/PresentsShop";
import ChatProgressBar from "../../components/ui/ChatProgressBar";
import LocalVideoPreview from "../../components/ui/LocalVideoPreview";
import rouletteService from '../../services/roulette.service';
import config from '../../config';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const getThumbnail = async (axiosPrivate, id) => {
    const user = await axiosPrivate.get(config.API.USERS.BY_ID(id));
    return user?.data?.photos[0];
}

function Roulette() {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const userId = useSelector((state) => state.auth.userId);
    const [isSearching, setIsSearching] = useState(false);
    const [isMatched, setIsMatched] = useState(false);
    const [matchedUser, setMatchedUser] = useState(null);
    const [roomId, setRoomId] = useState();
    const [chatMessages, setChatMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    // Agora states
    const client = useMemo(() => AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' }), []);
    const [localTracks, setLocalTracks] = useState([]);
    const [remoteUsers, setRemoteUsers] = useState([]);
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    // UI states
    const [showToast, setShowToast] = useState(false);
    const [showInstruction, setShowInstruction] = useState(false);
    const [animateClass, setAnimateClass] = useState("animate-slideDown");
    const [dayLimit, setDayLimit] = useState(false);
    const [viewLimit, setViewLimit] = useState(false);
    const [presentsShop, setPresentsShop] = useState(false);
    const [swipeStart, setSwipeStart] = useState(0);
    const presentsRef = useRef(null);
    const [timeLeft, setTimeLeft] = useState(25);
    const timerRef = useRef(null);

    // Проверка разрешений на доступ к камере и микрофону
    const checkPermissions = async () => {
        if (!navigator.permissions || !navigator.permissions.query) {
            console.log('Permissions API not supported');
            return false;
        }
        try {
            const cameraPermission = await navigator.permissions.query({ name: 'camera' });
            const microphonePermission = await navigator.permissions.query({ name: 'microphone' });
            return (
                cameraPermission.state === 'granted' && microphonePermission.state === 'granted'
            );
        } catch (error) {
            console.error('Error checking permissions:', error);
            return false;
        }
    };

    // Создание и кэширование треков
    useEffect(() => {
        let isMounted = true;

        const createTracks = async () => {
            try {
                if (localTracks.length > 0) {
                    console.log('Using existing tracks');
                    return localTracks;
                }

                const hasPermissions = await checkPermissions();
                if (!hasPermissions) {
                    console.log('Requesting camera and microphone permissions');
                }

                const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
                if (isMounted) {
                    setLocalTracks([audioTrack, videoTrack]);
                }
                return [audioTrack, videoTrack];
            } catch (error) {
                console.error('Failed to create tracks:', error);
                if (error.name === 'NotAllowedError') {
                    toast.error('Please allow access to camera and microphone');
                } else {
                    toast.error('Error accessing media devices');
                }
                return [];
            }
        };

        createTracks();

        return () => {
            isMounted = false;
        };
    }, []);

    // Подключение к рулетке
    useEffect(() => {
        rouletteService.connect();

        const unsubscribeMatched = rouletteService.onMatched(async data => {
            const otherThumbnail = await getThumbnail(axiosPrivate, data.matchedUserId);
            const currentThumbnail = await getThumbnail(axiosPrivate, userId);
            setIsMatched(true);
            setMatchedUser(data.matchedUserId);
            setRoomId(data.roomId);
        });

        const unsubscribeMessage = rouletteService.onMessage(data => {
            setChatMessages(prev => [...prev, {
                id: Date.now(),
                userId: data.userId,
                message: data.message,
                timestamp: new Date().toLocaleTimeString()
            }]);
        });

        const unsubscribeEnd = rouletteService.onEnd(() => {
            handleEndChat();
        });

        const unsubscribeError = rouletteService.onError(error => {
            toast.error(error.message);
        });

        return () => {
            unsubscribeMatched();
            unsubscribeMessage();
            unsubscribeEnd();
            unsubscribeError();
            rouletteService.disconnect();
        };
    }, [axiosPrivate, userId]);

    // Инициализация Agora
    useEffect(() => {
        const initAgora = async () => {
            try {
                if (!isPreviewVisible || !roomId) return;

                console.log('Initializing Agora for room:', roomId);

                const uid = await client.join(AGORA_APP_ID, roomId, null, null);
                console.log(`User ${uid} joined the channel`);

                let tracks = localTracks;
                if (tracks.length === 0) {
                    tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
                    setLocalTracks(tracks);
                }

                const [localAudioTrack, localVideoTrack] = tracks;

                if (localVideoTrack) {
                    localVideoTrack.play('local-video');
                }

                await client.publish([localAudioTrack, localVideoTrack]);

                client.remoteUsers.forEach(async (user) => {
                    if (user.hasVideo) {
                        await client.subscribe(user, 'video');
                        user.videoTrack.play('remote-video-container');
                    }
                    if (user.hasAudio) {
                        await client.subscribe(user, 'audio');
                        user.audioTrack.play();
                    }
                });

                client.on('user-published', async (user, mediaType) => {
                    console.log(`User ${user.uid} published ${mediaType}`);
                    await client.subscribe(user, mediaType);
                    if (mediaType === 'video') {
                        const remoteVideoTrack = user.videoTrack;
                        const remotePlayerContainer = document.getElementById('remote-video-container');
                        if (remotePlayerContainer) {
                            remoteVideoTrack.play(remotePlayerContainer);
                            setIsPreviewVisible(true);
                        } else {
                            console.error('Remote video container not found');
                        }
                    }
                    if (mediaType === 'audio') {
                        user.audioTrack.play();
                    }
                });

                client.on('user-unpublished', (user) => {
                    if (user.videoTrack) {
                        user.videoTrack.stop();
                    }
                });

                client.on('user-left', (user, reason) => {
                    console.log(`User ${user.uid} left the channel: ${reason}`);
                    setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid));
                });
            } catch (error) {
                console.error('Agora Error:', error);
                toast.error('Failed to initialize video chat');
            }
        };

        if (roomId && isMatched) {
            initAgora();
        }

        return () => {
            client.leave();
        };
    }, [roomId, isMatched, client, isPreviewVisible, localTracks]);

    // Синхронизация isPreviewVisible
    useEffect(() => {
        if (isMatched && roomId) {
            setIsPreviewVisible(true);
        } else {
            setIsPreviewVisible(false);
        }
    }, [isMatched, roomId]);

    // Закрытие треков при размонтировании
    useEffect(() => {
        return () => {
            localTracks.forEach(track => {
                track.stop();
                track.close();
            });
            setLocalTracks([]);
        };
    }, [localTracks]);

    // Отключение треков, когда они не нужны
    useEffect(() => {
        if (!isPreviewVisible) {
            localTracks.forEach(track => {
                if (track.isPlaying) {
                    track.stop();
                }
            });
        }
    }, [isPreviewVisible, localTracks]);

    const handleJoin = () => {
        rouletteService.joinChat(userId);
        setIsSearching(true);
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (!roomId || !messageInput.trim()) return;

        rouletteService.sendMessage(roomId, messageInput);

        setChatMessages(prev => [...prev, {
            id: Date.now(),
            userId,
            message: messageInput,
            timestamp: new Date().toLocaleTimeString()
        }]);

        setMessageInput('');
    };

    const handleEndChat = () => {
        if (roomId) rouletteService.endChat(userId);

        setIsMatched(false);
        setMatchedUser(null);
        setRoomId(null);
        setChatMessages([]);
        setIsPreviewVisible(false);
        setRemoteUsers([]);
        client.leave();
        clearTimer();
    };

    const handleTouchStart = (e) => {
        setSwipeStart(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
        const swipeEnd = e.touches[0].clientY;
        const diff = swipeEnd - swipeStart;
        if (diff > 100) {
            setPresentsShop(false);
        }
    };

    const clearTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            setTimeLeft(25);
        }
    };

    useEffect(() => {
        if (isMatched) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearTimer();
                        handleEndChat();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            clearTimer();
        }

        return () => clearTimer();
    }, [isMatched]);

    const instructions = [
        {
            id: 1,
            svg: "/icons/instructions_timer_25sec.svg",
            title: "25 секунд",
            description: "У вас есть 25 секунд, чтобы определить, нравится ли вам человек или нет",
        },
        {
            id: 2,
            svg: "/icons/instr1.svg",
            title: "Лайк",
            description: "Если вам понравился человек и вы хотели бы продолжить общение в переписке – поставьте лайк",
        },
        {
            id: 3,
            svg: "/icons/instr3.svg",
            title: "Дизлайк",
            description: "Хотите перейти к следующему собеседнику – поставьте дизлайк",
        },
        {
            id: 4,
            svg: "/icons/instr4.svg",
            title: "Начать переписку",
            description: "Не хотите дожидаться симпатии? Напишите первым",
        }
    ];

    const startSearch = () => {
        console.log("START SEARCH");
        handleJoin();
    };

    useEffect(() => {
        const isFirstVisitChat = localStorage.getItem("firstVisitChat2");
        if (!isFirstVisitChat) {
            console.log("Пользователь нажал OK");
            setShowInstruction(true);
            setShowToast(true);
            setAnimateClass("animate-slideDown");
            setTimeout(() => {
                setAnimateClass("animate-slideUp");
                setTimeout(() => {
                    setShowToast(false);
                }, 900);
            }, 3000);

            localStorage.setItem("firstVisitChat2", "true");
        }
    }, []);

    // Добавление стилей
    const styles = `
    @keyframes progress {
        0% { width: 0%; }
        50% { width: 100%; }
        100% { width: 0%; }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
        100% { transform: scale(1); opacity: 1; }
    }

    @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
    }

    .animate-progress {
        animation: progress 2s ease-in-out infinite;
    }

    .animate-spin {
        animation: spin 2s linear infinite;
    }

    .animate-pulse {
        animation: pulse 2s ease-in-out infinite;
    }

    .animate-float {
        animation: float 3s ease-in-out infinite;
    }

    .animate-delay-1 {
        animation-delay: 0.2s;
    }

    .animate-delay-2 {
        animation-delay: 0.4s;
    }
    `;

    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
        return () => {
            document.head.removeChild(styleSheet);
        };
    }, []);

    return (
        <>
            {showInstruction && (
                <div className="z-40 w-[100vw] h-[100%] absolute flex justify-start items-center flex-col bg-black/80 backdrop-blur-[10px]">
                    <h1 className="font-raleway font-bold mt-[90px] text-white text-[26px]">Инструкция</h1>
                    <h1 className="font-raleway font-light mt-2 text-white text-center text-[18px]">Основные функции и жесты</h1>
                    <div className="grid grid-cols-1 justify-center flex-wrap items-center gap-[16px] mt-[16px]">
                        {instructions.map((ins, index) => (
                            <div
                                key={ins.id}
                                className={`w-[343px] pt-[10px] pb-[10px] gap-[12px] border-b ${index === instructions.length - 1 ? "border-none" : "border-[#6D6D6D]"} flex text-white cursor-pointer`}
                            >
                                <div className="h-[89px] flex justify-center items-center">
                                    <img src={ins.svg} className="w-[40px] h-[40px]" />
                                </div>
                                <div className="flex flex-col gap-[4px]">
                                    <span className="w-[270px] text-[18px] font-semibold">{ins.title}</span>
                                    <span className="w-[268px] text-[14px] font-light">{ins.description}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="absolute bottom-[30px]">
                        <Button onClick={() => setShowInstruction(false)}>Понятно</Button>
                    </div>
                </div>
            )}
            <div className="w-[100%] h-[100%] pt-[100px] flex flex-col !items-center overflow-x-hidden">
                <div className="z-0 w-full flex justify-center items-center flex-col">
                    <div className="w-[343px] flex flex-row">
                        <img
                            src="/icons/Button-menu.svg"
                            className="mt-3 w-[44px] h-[44px]"
                            onClick={() => navigate("/profileMenu")}
                        />
                        <div className="flex flex-row justify-end flex-grow">
                            <img
                                src="/icons/Button-instruction.svg"
                                className="mt-3 ml-3 w-[44px] h-[44px]"
                                onClick={() => setShowInstruction(true)}
                            />
                            <img
                                src="/icons/Button-notifications.svg"
                                className="mt-3 ml-3 w-[44px] h-[44px]"
                                onClick={() => navigate('/notifications')}
                            />
                        </div>
                    </div>
                    <div className="w-[100%] flex justify-center align-center mt-4">
                        {!viewLimit ? (
                            <div className="relative w-[343px] rounded-[16px]">
                                {isMatched && (
                                    <div className="absolute top-0 mt-4 z-[3] w-[100%] flex items-center justify-center">
                                        <ChatProgressBar completed={25 - timeLeft} />
                                    </div>
                                )}
                                <div
                                    id="remote-video"
                                    ref={remoteVideoRef}
                                    className="z-[1] w-[343px] h-[527px] rounded-[16px] object-cover overflow-hidden bg-[#043939] flex items-center justify-center"
                                >
                                    {isMatched ? (
                                        <div className="w-[343px] h-[527px] bg-[#043939] rounded-[16px] flex items-center justify-center flex-col relative">
                                            <div
                                                className="absolute inset-0 w-full h-full z-[1]"
                                                id="remote-video-container"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    overflow: 'hidden',
                                                    borderRadius: '16px'
                                                }}
                                            />
                                            <LocalVideoPreview
                                                screen={'wait'}
                                                style={{
                                                    position: "absolute",
                                                    top: 0,
                                                    right: 0,
                                                    marginTop: "2rem",
                                                    marginRight: "0.5rem",
                                                    zIndex: 30,
                                                    width: "80px",
                                                    height: "140px",
                                                    borderRadius: "12px",
                                                    objectFit: "cover",
                                                    overflow: "hidden",
                                                }}
                                            />
                                            <div className="z-[8] absolute bottom-[23px] w-[100%] flex items-center justify-center">
                                                <div className="w-[338px] h-[70px] flex flex-row justify-center gap-[16px] items-center opacity-30">
                                                    <div
                                                        className="w-[64px] h-[64px] rounded-[50%] flex justify-center items-center"
                                                        onClick={handleEndChat}
                                                    >
                                                        <img
                                                            src="/icons/photo_overlay_button_2.svg"
                                                            alt="End Chat"
                                                            className="w-[64px] h-[64px]"
                                                        />
                                                    </div>
                                                    <div className="w-[64px] h-[64px] rounded-[50%] flex justify-center items-center">
                                                        <img
                                                            src="/icons/photo_overlay_button_5.svg"
                                                            alt="Presents"
                                                            className="w-[64px] h-[64px]"
                                                        />
                                                    </div>
                                                    <div className="w-[64px] h-[64px] rounded-[50%] flex justify-center items-center">
                                                        <img
                                                            src="/icons/photo_overlay_button_4.svg"
                                                            alt="Start Search"
                                                            className="w-[64px] h-[64px]"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : isSearching ? (
                                        <div className="w-[343px] h-[527px] bg-[#043939] rounded-[16px] flex items-center justify-center flex-col relative">
                                            <LocalVideoPreview
                                                screen={'wait'}
                                                style={{
                                                    position: "absolute",
                                                    top: 0,
                                                    right: 0,
                                                    marginTop: "2rem",
                                                    marginRight: "0.5rem",
                                                    zIndex: 30,
                                                    width: "80px",
                                                    height: "140px",
                                                    borderRadius: "12px",
                                                    objectFit: "cover",
                                                    overflow: "hidden",
                                                }}
                                            />
                                            <object data="/icons/video_chat_wait.svg" type="image/svg+xml" className="w-[48px] h-[48px]" />
                                            <p className="text-center text-white text-[20px] font-medium mt-[19px]">Ищем собеседника.</p>
                                            <p className="text-center text-white text-[20px] font-medium">Пожалуйста подождите...</p>
                                            <div className="w-[100%]" />
                                            <div className="z-[8] absolute bottom-[23px] w-[100%] flex items-center justify-center">
                                                <div className="w-[338px] h-[70px] flex flex-row justify-center gap-[16px] items-center opacity-30">
                                                    <div className="w-[64px] h-[64px] rounded-[50%] flex justify-center items-center">
                                                        <img
                                                            src="/icons/photo_overlay_button_2.svg"
                                                            alt="End Chat"
                                                            className="w-[64px] h-[64px]"
                                                        />
                                                    </div>
                                                    <div className="w-[64px] h-[64px] rounded-[50%] flex justify-center items-center">
                                                        <img
                                                            src="/icons/photo_overlay_button_5.svg"
                                                            alt="Presents"
                                                            className="w-[64px] h-[64px]"
                                                        />
                                                    </div>
                                                    <div className="w-[64px] h-[64px] rounded-[50%] flex justify-center items-center">
                                                        <img
                                                            src="/icons/photo_overlay_button_4.svg"
                                                            alt="Start Search"
                                                            className="w-[64px] h-[64px]"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-[343px] h-[527px] bg-[#043939] rounded-[16px] flex items-center justify-center flex-col relative">
                                            <div className="w-[100%] h-[100%]">
                                                <LocalVideoPreview
                                                    screen={'start'}
                                                    style={{
                                                        zIndex: 2,
                                                        width: "100%",
                                                        height: "100%",
                                                        borderRadius: "12px",
                                                        objectFit: "cover",
                                                        overflow: "hidden",
                                                    }}
                                                />
                                            </div>
                                            <div className="absolute z-[100] bottom-[16px] w-[311px] h-[64px] flex items-center justify-center">
                                                <Button onClick={startSearch}>Найти собеседника</Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div
                                    id="local-video"
                                    ref={localVideoRef}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        marginTop: "2rem",
                                        marginRight: "0.5rem",
                                        zIndex: 2,
                                        width: "80px",
                                        height: "140px",
                                        borderRadius: "12px",
                                        objectFit: "cover",
                                        overflow: "hidden",
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="w-[343px] h-[527px] bg-[#043939] rounded-[16px] flex items-center justify-center flex-col">
                                <img src="/icons/ViewLimit.svg" alt="" />
                                <p className="text-center text-white text-[22px] font-semibold mt-2">Просмотры закончились<br />(40/40)</p>
                                <p className="text-center text-white text-[16px] font-normal mt-2">Новые будут доступны через:</p>
                                <div className="mt-5 rounded-[8px] text-white bg-[#0B6666] pl-[12px] pr-[12px] pt-[8px] pb-[8px]">23 ч 59 мин</div>
                                <div className="mt-8">
                                    <Button className="w-[300px]">Хочу 600 просмотров в день</Button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="fixed bottom-0 z-[6] w-[100%] flex items-center justify-center">
                        <Navigation tab={2} />
                    </div>
                </div>
                {showToast && (
                    <div className={`z-[150] w-[343px] fixed font-light mt-2 text-white flex justify-center items-center flex-wrap font-raleway gap-[5px] text-[16px] px-4 py-2 rounded-lg bg-[#043939] border-[1.5px] border-[#a1f69e] ${animateClass}`}>
                        Вам начислено: <span className="text-[18px] font-medium">+25</span>{" "}
                        <img src="/icons/myta-coin.svg" alt="" />
                    </div>
                )}
                {dayLimit && (
                    <div
                        className="fixed inset-0 bg-opacity-50 flex justify-center items-end z-20"
                        onClick={() => setDayLimit(false)}
                    >
                        <div
                            className="w-full rounded-t-2xl transform transition-transform duration-300 translate-y-0"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <DayLimit />
                        </div>
                    </div>
                )}
                {presentsShop && (
                    <div
                        className="fixed inset-0 bg-opacity-50 flex justify-center items-end z-20 bg-black/80 backdrop-blur-[10px]"
                        onClick={() => setPresentsShop(false)}
                    >
                        <div
                            className="w-full rounded-t-2xl transform transition-transform duration-300 translate-y-0"
                            onClick={(e) => e.stopPropagation()}
                            ref={presentsRef}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                        >
                            <PresentsShop />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Roulette;