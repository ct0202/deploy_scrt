import React, {useState, useEffect, useRef, useMemo} from "react";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { AGORA_APP_ID } from "../../config";
import AgoraRTC from 'agora-rtc-sdk-ng';
import { Navigation } from "../../components/shared/Navigation";
import DayLimit from "../../components/shared/DayLimit";
import PresentsShop from "../../components/shared/PresentsShop";
import ChatProgressBar from "../../components/ui/ChatProgressBar";
import LocalVideoPreview from "../../components/ui/LocalVideoPreview";
import rouletteService from '../../services/roulette.service';

import { axiosPrivate } from '../../axios';
import config from '../../config';


const getThumbnail = async (id) => {
    const user = await axiosPrivate.get(config.API.USERS.BY_ID(id));
    return user?.data?.photos[0];
}


function Roulette() {
    const navigate = useNavigate();
    const userId = useSelector((state) => state.auth.userId);
    const [socket, setSocket] = useState(null);
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
    const [menuAction, setMenuAction] = useState(2);
    const [dayLimit, setDayLimit] = useState(false);
    const [viewLimit, setViewLimit] = useState(false);
    const [presentsShop, setPresentsShop] = useState(false);

    const [swipeStart, setSwipeStart] = useState(0);
    const presentsRef = useRef(null);


    useEffect(() => {
        rouletteService.connect();
    
        const unsubscribeMatched = rouletteService.onMatched(async data => {
            const otherThumbnail = await getThumbnail(data.matchedUserId);
            const currentThumbnail = await getThumbnail(userId);
            setIsMatched(true);
            console.log(data);
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
    }, []);

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
        if (roomId) rouletteService.endChat(roomId);
    
        setIsMatched(false);
        setMatchedUser(null);
        setRoomId(null);
        setChatMessages([]);
        setIsPreviewVisible(false);
    
        localTracks.forEach(track => {
            track.stop();
            track.close();
        });
    
        setLocalTracks([]);
        client.leave();
    };


    const handleTouchStart = (e) => {
        setSwipeStart(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
        const swipeEnd = e.touches[0].clientY;
        const diff = swipeEnd - swipeStart;

        // Если свайпнули вниз на 100px — закрываем
        if (diff > 100) {
            setPresentsShop(false);
        }
    };

    const instructions = [
        {
            id: 1,
            svg: "/icons/instructions_timer_25sec.svg",
            title: "25 секунд",
            description:
                "У вас есть 25 секунд, чтобы определить, нравится ли вам человек или нет",
        },
        {
            id: 2,
            svg: "/icons/instr1.svg",
            title: "Лайк",
            description:
                "Если вам понравился человек и вы хотели бы продолжить общение в переписке – поставтье лайк",
        },
        {
            id: 3,
            svg: "/icons/instr3.svg",
            title: "Дизлайк",
            description: "Хотите перейти к следующему собеседнику – поставтье дизлайк",
        },
        {
            id: 4,
            svg: "/icons/instr4.svg",
            title: "Начать переписку",
            description:
                "Не хотите дожидаться симпатии? Напишите первым",
        }
    ];

    useEffect(() => {
        const initAgora = async () => {
            try {
                if (!isPreviewVisible) {
                    return;
                }

                console.log("ROOM!", roomId);

                // Подключение к каналу (uid = null означает, что Agora выдаст случайный uid)
                const uid = await client.join(AGORA_APP_ID, roomId, null, null);

                // Создание локального видеотрека
                const [localAudioTrack, localVideoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
                setLocalTracks([localAudioTrack, localVideoTrack]);

                // Вывод локального видео
                localVideoTrack.play("local-video");

                // Публикация аудио- и видео-треков в канал
                await client.publish([localAudioTrack, localVideoTrack]);

                console.log(`User ${uid} joined the channel`);

                client.remoteUsers.forEach(async (user) => {
                    if (user.hasVideo) { // Проверяем, есть ли видео
                        await client.subscribe(user, "video");
                        user.videoTrack.play("remote-video");
                    }
                    if (user.hasAudio) { // Проверяем, есть ли аудио
                        await client.subscribe(user, "audio");
                        user.audioTrack.play();
                    }
                });

                // Обработчик для отображения входящих видео от других пользователей
                client.on("user-published", async (user, mediaType) => {
                    await client.subscribe(user, mediaType);
                    if (mediaType === "video") {
                        const remoteVideoTrack = user.videoTrack;
                        const remotePlayerContainer = document.getElementById("remote-video");
                        if (remotePlayerContainer) {
                            remoteVideoTrack.play(remotePlayerContainer);
                        } else {
                            console.error("Remote video container not found");
                        }
                    }
                    if (mediaType === "audio") {
                        const remoteAudioTrack = user.audioTrack;
                        remoteAudioTrack.play(); // Включает звук
                    }
                });

                // Удаление видео, если пользователь выходит
                client.on("user-unpublished", (user) => {
                    const remotePlayerContainer = document.getElementById('remote-video');
                    if (remotePlayerContainer) {
                        remotePlayerContainer.remove();
                    }
                });
            } catch (error) {
                console.error("Agora Error: ", error);
                toast.error("Failed to initialize video chat");
            }
        };

        if (roomId) {
            initAgora();
        }

        return () => {
            client.leave();
        };
    }, [roomId]);

    useEffect(() => {
        // Очистка треков при размонтировании или когда превью не видно
        return () => {
            localTracks.forEach(track => {
                track.stop();
                track.close();
            });
            setLocalTracks([]);
        };
    }, [isPreviewVisible]);

    const startSearch = () => {
        console.log("START SEARCH");
        handleJoin();
    };

    // const handleEndChat = () => {
    //     if (socket && roomId) {
    //         socket.emit('end-roulette-chat', { roomId });
    //     }
    //     setIsMatched(false);
    //     setMatchedUser(null);
    //     setRoomId(null);
    //     setChatMessages([]);
    //     setIsPreviewVisible(false);
    //     localTracks.forEach(track => {
    //         track.stop();
    //         track.close();
    //     });
    //     setLocalTracks([]);
    //     client.leave();
    // };

    // const sendMessage = (e) => {
    //     e.preventDefault();
    //     if (!socket || !roomId || !messageInput.trim()) return;

    //     socket.emit('roulette-message', {
    //         roomId,
    //         message: messageInput
    //     });

    //     setChatMessages(prev => [...prev, {
    //         id: Date.now(),
    //         userId,
    //         message: messageInput,
    //         timestamp: new Date().toLocaleTimeString()
    //     }]);

    //     setMessageInput('');
    // };

    useEffect(() => {
        const isFirstVisitChat = localStorage.getItem("firstVisitChat2");
        // const isFirstVisitChat = false;
        if (!isFirstVisitChat) {
            console.log("Пользователь нажал OK");
            setShowInstruction(true);
            setShowToast(true);
            setAnimateClass("animate-slideDown");
            setTimeout(() => {
                setAnimateClass("animate-slideUp");
                // После окончания анимации скрытия (1 секунда), убираем тост из DOM
                setTimeout(() => {
                    setShowToast(false);
                }, 900);
            }, 3000);

            localStorage.setItem("firstVisitChat2", "true");
        }
    }, []);

    // Add this to your CSS or style section
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

    // Add this to your component
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
            <div
                className={`z-40 w-[100vw] h-[100%] absolute flex justify-start items-center flex-col bg-black/80 backdrop-blur-[10px]`}
            >
                <h1 className="font-raleway font-bold mt-[90px] text-white text-[26px]">
                    Инструкция
                </h1>
                <h1 className="font-raleway font-light mt-2 text-white text-center text-[18px]">
                    Основные функции и жесты
                </h1>
                <div className="grid gric-cols-1 justify-center flex-wrap items-center gap-[16px] mt-[16px]">
                    {instructions.map((ins, index) => (
                        <div
                            key={ins.id}
                            className={`w-[343px] pt-[10px] pb-[10px] gap-[12px] border-b ${
                                index === instructions.length - 1 ? "border-none" : "border-[#6D6D6D]"
                            } flex text-white cursor-pointer`}
                        >
                            <div className="h-[89px] flex justify-center items-center">
                                <img src={ins.svg} className="w-[40px] h-[40px]" />
                            </div>
                            <div className={`flex flex-col gap-[4px]`}>
                                      <span className={`w-[270px] text-[18px] font-semibold`}>
                                        {ins.title}
                                      </span>
                                <span className={`w-[268px] text-[14px] font-light`}>
                                        {ins.description}
                                    </span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="absolute bottom-[30px]">
                    <Button
                        onclick={() => setShowInstruction(false)}
                    >
                        Понятно
                    </Button>
                </div>
            </div>
        )}
        <div className="w-[100%] h-[100%] pt-[100px] flex flex-col !items-center overflow-x-hidden">
            <div className="z-0 w-full flex justify-center items-center flex-col">
                <div className="w-[343px] flex flex-row ">
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
                            onClick={() => {navigate('/notifications')}}
                        />
                    </div>
                </div>
                <div></div>
                <div className="w-[100%] flex justify-center align-center mt-4">
                    {!viewLimit ?
                    <div className="relative w-[343px] rounded-[16px]">

                        <div className="absolute top-0 mt-4 z-[3] w-[100%] flex items-center justify-center">
                            <ChatProgressBar completed={isSearching ? 50 : 0}/>
                        </div>

                        <div
                            id="remote-video"
                            ref={remoteVideoRef}
                            className="z-[1] w-[343px] h-[527px] rounded-[16px] object-cover overflow-hidden bg-[#043939] flex items-center justify-center"
                        >
                            {isMatched ? (
                                <div className="text-white text-center">
                                    <p className="text-2xl font-bold mb-2">Matched!</p>
                                    <p className="text-sm">You are now connected with a stranger</p>
                                </div>
                            ) : isSearching ? (
                                <div className="w-[343px] h-[527px]
                                bg-[#043939] rounded-[16px]
                                flex items-center justify-center flex-col relative
                                ">
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
                                    <object data="/icons/video_chat_wait.svg" type="image/svg+xml" className="w-[48px] h-[48px]"></object>
                                    <p className="text-center text-white text-[20px] font-medium mt-[19px]">Ищем собеседника.</p>
                                    <p className="text-center text-white text-[20px] font-medium">Пожалуйста подождите...</p>
                                    <div className="w-[100%]"></div>

                                    <div className="z-[8] absolute bottom-[23px] w-[100%] flex items-center justify-center"> 
                                        <div className="w-[338px] h-[70px] flex flex-row justify-center gap-[16px] items-center opacity-30">
                                            <div
                                                className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center`}
                                                // onClick={handleEndChat} кнопка дизейблд
                                            >
                                                <img
                                                    src="/icons/photo_overlay_button_2.svg"
                                                    alt="End Chat"
                                                    className="w-[64px] h-[64px]"
                                                />
                                            </div>
                                            <div
                                                className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center`}
                                                // onClick={() => setPresentsShop(true)} кнопка дизейблд
                                            >
                                                <img
                                                    src="/icons/photo_overlay_button_5.svg"
                                                    alt="Presents"
                                                    className="w-[64px] h-[64px]"
                                                />
                                            </div>
                                            <div
                                                className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center`}
                                                // onClick={startSearch} кнопка дизейблд
                                            >
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
                                <div className="w-[343px] 
                                h-[527px]
                                bg-[#043939] 
                                rounded-[16px]
                                flex 
                                items-center 
                                justify-center 
                                flex-col 
                                relative
                                ">
                                    <div className="w-[100%] h-[100%]">
                                        <LocalVideoPreview screen={'start'} style={{
                                         zIndex: 2,
                                         width: "100%",
                                         height: "100%",
                                         borderRadius: "12px",
                                         objectFit: "cover",
                                         overflow: "hidden",
                                     }}
                                    />
                                    </div>
                                    <div className="absolute z-[100] pointer-events-auto bottom-[16px] w-[311px] h-[64px] flex items-center justify-center">
                                    <Button onClick={startSearch} >Найти собеседника</Button>
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
                        
                        {/* <div className="z-[8] translate-y-[-90px] absolute w-[100%] flex items-center justify-center">
                            <div className="w-[338px] h-[70px] mb-4 flex flex-row justify-evenly items-center">
                                <div
                                    className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center`}
                                    onClick={handleEndChat}
                                >
                                    <img
                                        src="/icons/photo_overlay_button_2.svg"
                                        alt="End Chat"
                                        className="w-[64px] h-[64px]"
                                    />
                                </div>
                                <div
                                    className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center`}
                                    onClick={() => setPresentsShop(true)}
                                >
                                    <img
                                        src="/icons/photo_overlay_button_5.svg"
                                        alt="Presents"
                                        className="w-[64px] h-[64px]"
                                    />
                                </div>
                                <div
                                    className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center`}
                                    onClick={startSearch}
                                >
                                    <img
                                        src="/icons/photo_overlay_button_4.svg"
                                        alt="Start Search"
                                        className="w-[64px] h-[64px]"
                                    />
                                </div>
                            </div>
                        </div> */}

                        {isMatched && (
                            <div className="absolute bottom-0 left-0 right-0 bg-[#043939] p-4 rounded-t-lg">
                                <div className="h-32 overflow-y-auto mb-2">
                                    {chatMessages.map(msg => (
                                        <div key={msg.id} className="mb-2">
                                            <span className="text-sm text-gray-400">{msg.timestamp}</span>
                                            <p className="text-white">
                                                {msg.userId === userId ? 'You' : 'Stranger'}: {msg.message}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <form onSubmit={sendMessage} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-1 bg-[#022424] p-2 rounded text-white"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-[#022424] hover:bg-[#033333] px-4 py-2 rounded"
                                    >
                                        Send
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                        :
                        <div className="w-[343px] h-[527px]
                            bg-[#043939] rounded-[16px]
                            flex items-center justify-center flex-col
                            ">
                            <img src="/icons/ViewLimit.svg" alt=""/>
                            <p className="text-center text-white text-[22px] font-semibold mt-2">Просмотры
                                закончились<br/>(40/40)</p>
                            <p className="text-center text-white text-[16px] font-normal mt-2">Новые будут доступны
                                через:</p>
                            <div className="mt-5 rounded-[8px] text-white bg-[#0B6666] pl-[12px] pr-[12px] pt-[8px] pb-[8px]">23 ч
                                59 мин
                            </div>
                            <div className="mt-8">
                                <Button className="w-[300px]">
                                    Хочу 600 просмотров в день
                                </Button>
                            </div>
                        </div>
                    }
                </div>
                <div className="fixed bottom-0 z-[6] w-[100%] flex items-center justify-center">
                    <Navigation tab={2} />
                </div>
            </div>


            {showToast && (
                <div
                    className={`z-[150] w-[343px] fixed font-light mt-2  text-white flex justify-center items-center flex-wrap font-raleway gap-[5px] text-[16px] px-4 py-2 rounded-lg bg-[#043939] border-[1.5px] border-[#a1f69e] ${animateClass}`}
                >
                    Вам начислено: <span className="text-[18px] font-medium">+25</span>{" "}
                    <img src="/icons/myta-coin.svg" alt="" />
                </div>
            )}
            {dayLimit && (
                <div
                    className="fixed inset-0  bg-opacity-50 flex justify-center items-end z-20"
                    onClick={() => {setDayLimit(false)}}
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
                    onClick={() => {
                        setPresentsShop(false)
                    }}
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
