import React, {useState, useEffect, useRef, useMemo} from "react";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { INSTRUCTIONS_VIDEOCHAT } from "../../constants/instructions";

import LocalVideoPreview from "../../components/ui/LocalVideoPreview";

import DayLimit from "../../components/shared/DayLimit";
import PresentsShop from "../../components/shared/PresentsShop";
import ChatProgressBar from "../../components/ui/ChatProgressBar";
import Match from "../Match";

import AgoraRTC from 'agora-rtc-sdk-ng';
import config from '../../config';
import { axiosPrivate } from '../../axios';
import {Navigation} from "../../components/shared/Navigation";
import { AGORA_APP_ID } from "../../config";
import { useParams } from "react-router-dom";

function VideoChat() {
    // const CHANNEL
    const { id } = useParams();
    const TOKEN = null; // Можно использовать токен, если требуется
    const CHANNEL = `videochat-${id}`; // Имя канала

    const [showToast, setShowToast] = useState(false);
    const [showInstruction, setShowInstruction] = useState(false);

    const [animateClass, setAnimateClass] = useState("animate-slideDown");

    const [menuAction, setMenuAction] = useState(2);

    const [dayLimit, setDayLimit] = useState(false);
    const [viewLimit, setViewLimit] = useState(false);
    const [presentsShop, setPresentsShop] = useState(false);

    const navigate = useNavigate();

    const [swipeStart, setSwipeStart] = useState(0);
    const presentsRef = useRef(null);

    const [screen, setScreen] = useState('start'); 
    //start, chatting, wait, match, out-of-limit,

    const handleTouchStart = (e) => {
        setSwipeStart(e.touches[0].clientY);
    };

    const handleAddMytaCoins = async (amount) => {
        try {
            const response = await axiosPrivate.post(config.API.WALLET.PURCHASE, {
              amount,
              type: 'mytaCoins'
            });
            console.log('Myta coins added:', response.data);
        } catch (error) {
          console.error('Error purchasing coins:', error);
        }
      };  

    const handleTouchMove = (e) => {
        const swipeEnd = e.touches[0].clientY;
        const diff = swipeEnd - swipeStart;

        if (diff > 100) {
            setPresentsShop(false);
        }
    };

    const client = useMemo(() => AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' }), []);

    const remoteVideoRef = useRef(null);


    useEffect(() => {
        const initAgora = async () => {
            try {
                // Подключение к каналу (uid = null означает, что Agora выдаст случайный uid)
                const uid = await client.join(AGORA_APP_ID, CHANNEL, TOKEN, null);

                // Создание локального видеотрека
                const [localAudioTrack, localVideoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();

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

                // client.on("user-joined", async (user) => {
                //     console.log(`User ${user.uid} joined`);
                //     await subscribeToUser(user);
                // });

                // Обработчик для отображения входящих видео от других пользователей
                client.on("user-published", async (user, mediaType) => {
                    await client.subscribe(user, mediaType);
                    if (mediaType === "video") {
                        const remoteVideoTrack = user.videoTrack;
                        // const remotePlayerContainer = document.createElement("div");
                        // remotePlayerContainer.id = `player-${user.uid}`;
                        // remotePlayerContainer.style.width = "640px";
                        // remotePlayerContainer.style.height = "480px";
                        // document.body.append(remotePlayerContainer);

                        const remotePlayerContainer = document.getElementById("remote-video");
                        // console.log(remotePlayerContainer);
                        // remoteVideoTrack.play(remotePlayerContainer);
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
            }
        };

        initAgora();

        return () => {
            client.leave();
        };
    }, [client]);

    const subscribeToUser = async (user) => {
        if (user.hasVideo) {
            await client.subscribe(user, "video");
            user.videoTrack.play("remote-video");
        }
        if (user.hasAudio) {
            await client.subscribe(user, "audio");
            user.audioTrack.play();
        }
    };

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
                    {INSTRUCTIONS_VIDEOCHAT.map((ins, index) => (
                        <div
                            key={ins.id}
                            className={`w-[343px] pt-[10px] pb-[10px] gap-[12px] border-b ${
                                index === INSTRUCTIONS_VIDEOCHAT.length - 1 ? "border-none" : "border-[#6D6D6D]"
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
                        onClick={() => setShowInstruction(false)}
                    >
                        Понятно
                    </Button>
                </div>
            </div>
        )}
        <div className="w-[100%] h-[100vh] pt-[100px] flex flex-col !items-center overflow-hidden">
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
                    {screen === 'chatting' && (
                    <div className="relative w-[343px] rounded-[16px]">

                        <div className="
                        absolute 
                        top-0 
                        mt-4 
                        z-[3] 
                        w-[100%] 
                        flex 
                        items-center 
                        justify-center">
                            <ChatProgressBar completed={25}/>
                        </div>

                        <div
                            id="remote-video"
                            ref={remoteVideoRef}
                            className="z-[1] w-[343px] h-[527px] rounded-[16px] object-cover overflow-hidden"
                        ></div>

                        <div id="local-video"
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

                        >

                        </div>

                        <div className="z-[8] translate-y-[-90px] absolute w-[100%] flex items-center justify-center">
                            <div className="w-[338px] h-[70px] mb-4 flex flex-row justify-evenly items-center">
                                <div
                                    className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center`}
                                    onClick={() => {setViewLimit(true)}}
                                >
                                    <img
                                        src="/icons/photo_overlay_button_2.svg"
                                        alt="Сменить собеседника"
                                        className=" w-[64px] h-[64px]"
                                    />
                                </div>
                                <div
                                    className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center`}
                                >
                                    <img
                                        src="/icons/photo_overlay_button_5.svg"
                                        alt="Подарок"
                                        className=" w-[64px] h-[64px]"
                                        onClick={() => {setPresentsShop(true)}}
                                    />
                                </div>
                                <div
                                    className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center`}
                                    onClick = {() => {navigate("/match")}}
                                >
                                    <img
                                        src="/icons/photo_overlay_button_4.svg"
                                        alt="Лайк"
                                        className="w-[64px] h-[64px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                    {screen === 'limit' && (
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
                    )}
                    {screen === 'wait' && (
                        <div className="w-[343px] h-[527px]
                        bg-[#043939] rounded-[16px]
                        flex items-center justify-center flex-col
                        ">
                            <object data="/icons/video_chat_wait.svg" type="image/svg+xml" className="w-[48px] h-[48px]"></object>
                            <p className="text-center text-white text-[20px] font-medium mt-[19px]">Ищем собеседника.</p>
                            <p className="text-center text-white text-[20px] font-medium">Пожалуйста подождите...</p>
                            <div className="w-[100%]"></div>
                        </div>
                    )}
                    {screen === 'start' && (
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
                            <div className="absolute z-[10] bottom-[16px] w-[311px] h-[64px] flex items-center justify-center">
                                <Button>Найти собеседника</Button>
                            </div>
                            <div className="w-[100%] h-[100%]">
                            {/*<div id="local-video"*/}
                                <LocalVideoPreview screen={screen} style={{
                                 zIndex: 2,
                                 width: "100%",
                                 height: "100%",
                                 borderRadius: "12px",
                                 objectFit: "cover",
                                 overflow: "hidden",
                             }}
                            />
                            </div>
                        </div>
                    )}
                </div>
                <div className="fixed bottom-0 z-[6] w-[100%] flex items-center justify-center">
                    <Navigation tab={2} />
                </div>
            </div>

            {showToast && handleAddMytaCoins(25) && (
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

export default VideoChat;
