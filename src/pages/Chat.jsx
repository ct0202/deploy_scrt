import React, {useState, useEffect, useRef} from "react";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./styles/SwiperCustomPagination.css";

import DayLimit from "../components/shared/DayLimit";
import PresentsShop from "../components/shared/PresentsShop";

import ChatProgressBar from "../components/ui/ChatProgressBar";

function Chat() {
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
            svg: "/icons/instr1.svg",
            title: "Лайк",
            description:
                "Если вам понравился человек и вы хотели бы продолжить общение в переписке – поставтье лайк",
        },
        {
            id: 2,
            svg: "/icons/instr2.svg",
            title: "Супер-Лайк",
            description:
                "Супер-лайк отобразится в уведомлениях человека, который вам понравился, и не останется незамеченным",
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
        const isFirstVisitChat = localStorage.getItem("firstVisitChat");

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

            localStorage.setItem("firstVisitChat", "true");
        }
    }, []);

    return (
        <div className="w-[100%] !h-[100vh] pt-[100px] flex flex-col !items-center overflow-x-hidden !overflow-hidden">
            {showInstruction && (
                <div
                    className={`z-40 w-[100vw] h-[100%] absolute flex justify-center items-center flex-col bg-black/80 backdrop-blur-[10px]`}
                >
                    <h1 className="font-raleway font-bold mt-6 text-white text-[26px]">
                        Инструкция
                    </h1>
                    <h1 className="font-raleway font-light mt-2 text-white text-center text-[18px]">
                        Основные функции и жесты
                    </h1>
                    <div className="grid gric-cols-1 justify-center flex-wrap items-center gap-[16px] mt-[16px]">
                        {instructions.map((ins) => (
                            <div
                                key={ins.id}
                                className={`w-[343px] h-[120  px] gap-[12px] border-b border-[#6D6D6D] flex text-white cursor-pointer`}
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
                    <Button
                        className={"mt-[20px] mb-6"}
                        onclick={() => setShowInstruction(false)}
                    >
                        Понятно
                    </Button>
                </div>
            )}
            <div className="z-0 w-full flex justify-center items-center flex-col">
                <div className="w-[343px] flex flex-row ">
                    <img
                        src="/icons/Button-menu.svg"
                        className="mt-3 w-[44px] h-[44px]"
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
                        />
                    </div>
                </div>
                <div></div>
                <div className="w-[100%] flex justify-center align-center mt-4">
                    {!viewLimit ?
                    <div className="relative w-[343px] rounded-[16px]">

                        <div className="absolute top-0 mt-4 w-[100%] flex items-center justify-center">
                            <ChatProgressBar completed={25}/>
                        </div>

                        <img
                          src="/mock/user_3/user_3_chat_mock.png"
                          className="z-[1] w-[363px] h-[527px] rounded-[16px] object-cover"
                        />

                        <img
                            src="/mock/user_4/user_4_chat_small.png"
                            className="absolute top-0 right-0 mt-6 mr-2 z-[2] w-[80px] h-[140px] rounded-[12px] object-cover"
                        />

                        <div className="z-[8] translate-y-[-90px] absolute w-[100%] flex items-center justify-center">
                            <div className="w-[338px] h-[70px] mb-4 flex flex-row justify-evenly items-center">
                                <div
                                    className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center`}
                                    onClick={() => {setViewLimit(true)}}
                                >
                                    <img
                                        src="/icons/photo_overlay_button_2.svg"
                                        className=" w-[64px] h-[64px]"
                                    />
                                </div>
                                <div
                                    className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center`}
                                >
                                    <img
                                        src="/icons/photo_overlay_button_5.svg"
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
                                        className="w-[64px] h-[64px]"
                                    />
                                </div>
                            </div>
                        </div>
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
                        </div>
                    }
                </div>
                <div className="mt-5 w-[100%] flex items-center justify-center">
                    <div className="w-[338px] h-[70px] mb-4 bg-[#FFFFFF1A] flex flex-row justify-evenly items-center rounded-[400px]">
                        <div
                            className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center ${
                                menuAction === 1 ? "bg-[#FFFFFF1A]" : "bg-transparent"
                            }`}
                            onClick={() => {
                                setMenuAction(1);
                                navigate("/Meet");
                            }}
                        >
                            <img
                                src="/icons/bottom_bar_button_1.svg"
                                className="w-[24px] h-[24px]"
                            />
                        </div>
                        <div
                            className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center ${
                                menuAction === 2 ? "bg-[#FFFFFF1A]" : "bg-transparent"
                            }`}
                            onClick={() => {
                                setMenuAction(2);
                            }}
                        >
                            <img
                                src="/icons/bottom_bar_button_2.svg"
                                className=" w-[24px] h-[24px]"
                            />
                        </div>
                        <div
                            className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center ${
                                menuAction === 3 ? "bg-[#FFFFFF1A]" : "bg-transparent"
                            }`}
                            onClick={() => {
                                setMenuAction(3);
                                navigate("/streams");
                            }}
                        >
                            <img
                                src="/icons/bottom_bar_button_3.svg"
                                className=" w-[24px] h-[24px]"
                            />
                        </div>
                        <div
                            className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center ${
                                menuAction === 4 ? "bg-[#FFFFFF1A]" : "bg-transparent"
                            }`}
                            onClick={() => {
                                setMenuAction(4);
                            }}
                        >
                            <img
                                src="/icons/bottom_bar_button_4.svg"
                                className="w-[24px] h-[24px]"
                            />
                        </div>
                        <div
                            className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center ${
                                menuAction === 5 ? "bg-[#FFFFFF1A]" : "bg-transparent"
                            }`}
                            onClick={() => {
                                setMenuAction(5);
                            }}
                        >
                            <img src="/icons/myta-coin.svg" className="w-[24px] h-[24px]" />
                        </div>
                    </div>
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
    );
}

export default Chat;
