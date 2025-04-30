import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PresentsShop from "../../components/shared/PresentsShop";
import AgoraRTC from 'agora-rtc-sdk-ng';
import { useSelector } from 'react-redux';
import { AGORA_APP_ID } from '../../config';
import { toast } from 'react-toastify';

function WatchingStream() {
    const navigate = useNavigate();
    const { streamId } = useParams();
    const userId = useSelector((state) => state.auth.userId);

    const [hint, setHint] = useState(true);
    const [presentsShop, setPresentsShop] = useState(false);
    const [comments, setComments] = useState([
        {id: 1, avatar_src: '/mock/stream_chat_user_avatar.png', nickname: 'love_life', text: 'Как часто вы пользуетесь картой Альфа Банка?'},
        {id: 2, avatar_src: '/mock/stream_chat_user_avatar.png', nickname: 'love_life', text: 'Привет, как дела?✌️✌️✌️'},
        {id: 3, avatar_src: '/mock/stream_chat_user_avatar.png', nickname: 'love_life', text: 'Давай знакомиться, привет!!!'},
        {id: 4, avatar_src: '/mock/stream_chat_user_avatar.png', nickname: 'love_life', text: '', present: '/icons/presents/1.svg'}
    ]);

    // Agora refs
    const client = useRef(null);
    const remoteVideoTrack = useRef(null);
    const remoteVideoContainer = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        initializeAgora();
        return () => {
            stopWatching();
        };
    }, []);

    const initializeAgora = async () => {
        try {
            // Initialize Agora client
            client.current = AgoraRTC.createClient({ mode: 'live', codec: 'vp8' });
            
            // Set client role to audience
            await client.current.setClientRole('audience');

            // Join the channel
            const token = null; // Using null token for testing
            const channelName = `stream-${streamId}`;
            await client.current.join(AGORA_APP_ID, channelName, token, userId);

            // Set up event handlers
            client.current.on('user-published', async (user, mediaType) => {
                if (mediaType === 'video') {
                    // Subscribe to the remote user's video track
                    await client.current.subscribe(user, mediaType);
                    remoteVideoTrack.current = user.videoTrack;
                    
                    // Play the remote video
                    if (remoteVideoContainer.current) {
                        remoteVideoTrack.current.play(remoteVideoContainer.current);
                    }
                }
            });

            client.current.on('user-unpublished', async (user) => {
                // Stop playing the remote video
                if (remoteVideoTrack.current) {
                    remoteVideoTrack.current.stop();
                }
            });

            setIsLoading(false);
        } catch (error) {
            console.error('Error initializing stream:', error);
            toast.error('Failed to join stream');
            navigate(-1);
        }
    };

    const stopWatching = async () => {
        try {
            if (client.current) {
                // Stop remote video
                if (remoteVideoTrack.current) {
                    remoteVideoTrack.current.stop();
                }

                // Leave the channel
                await client.current.leave();
            }
        } catch (error) {
            console.error('Error stopping stream:', error);
        }
    };

    const [swipeStart, setSwipeStart] = useState(0);
    const presentsRef = useRef(null);

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

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center mt-[70px] w-[100%] h-[100vh] relative overflow-hidden overflow-x-hidden">
                <div className="text-white">Loading stream...</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center mt-[70px] w-[100%] h-[100vh] relative overflow-hidden overflow-x-hidden">
            <img alt="Фон" src="/images/image 20.png" className="absolute z-0 top-0 w-[100vw] h-[100vh]" />
            
            {/* Video Container */}
            <div 
                ref={remoteVideoContainer}
                className="absolute top-0 left-0 w-full h-full z-0"
                style={{
                    objectFit: 'cover'
                }}
            />

            <div className="absolute top-0 flex justify-between items-center w-[343px] h-[44px] mt-[21px] z-10">
                <img alt="Информация" src="/icons/Info.svg" onClick={() => navigate(`/streamer/${streamId}`)} />
                <img
                    alt="Назад"
                    src="/icons/Button-close.svg"
                    onClick={() => navigate(-1)}
                />
            </div>

            <div className="absolute bottom-10 left-3 w-[100%] mr-2 ml-2 text-raleway text-white flex flex-col font-raleway">
                {comments.map((cmmnt, index) => (
                    <div key={index} className="flex flex-row mt-4">
                        <img alt="Аватар" src={`${cmmnt.avatar_src}`} className="w-[32px] h-[32px] mr-3" />
                        <div>
                            <p className="text-[14px] font-normal">{cmmnt.nickname}</p>
                            {cmmnt.text === '' ? (
                                <img alt="Подарок" src={cmmnt.present} />
                            ) : (
                                <p className="text-[14px] font-semibold w-[303px]">{cmmnt.text}</p>
                            )}
                        </div>
                    </div>
                ))}
                <div className="flex flex-row items-center w-[100%]">
                    <div className="rounded-[400px] bg-[#FFFFFF33] flex items-center w-[269px] h-[64px] mt-4">
                        <input 
                            placeholder="Оставьте комментарий" 
                            className="pl-4 text-[18px] bg-transparent h-[64px] w-[269px] rounded-[400px] text-[#FFFFFF] font-normal"
                        />
                    </div>
                    <div 
                        className="ml-4 rounded-[50%] bg-[#FFFFFF33] flex items-center justify-center w-[64px] h-[64px] mt-4" 
                        onClick={() => setPresentsShop(true)}
                    >
                        <img alt="Подарок" src="/icons/present.svg" className="w-[24px] h-[24px]" />
                    </div>
                </div>
            </div>

            {hint && (
                <div className="absolute w-[188px] h-[92px] bottom-[120px] right-[20px] flex">
                    <img alt="Подсказка" src="/icons/Hint.svg" />
                    <p className="absolute text-white text-[13px] font-semibold pl-1.5 pt-1 pr-1">
                        <span className="text-[#A1F69E]">Стань заметнее,</span><br />
                        отправь приятный<br />
                        комлимент!
                    </p>
                    <img 
                        alt="Закрыть" 
                        src="/icons/Button-close.svg" 
                        className="z-[10] w-[20px] h-[20px] absolute right-[10px] top-[10px]" 
                        onClick={() => setHint(false)}
                    />
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
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                    >
                        <PresentsShop page={"stream"} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default WatchingStream;
