import React, {useState, useRef} from "react";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/SwiperCustomPagination.css";

import { INSTRUCTIONS_MEET } from "../../constants/instructions";
import PresentsShop from "../../components/shared/PresentsShop";
import DayLimit from "../../components/shared/DayLimit";

function Streamer() {
    const [presentsShop, setPresentsShop] = useState(false);
    const [showInstruction, setShowInstruction] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [reportMenu, setReportMenu] = useState(false);
    const [blockUser, setBlockUser] = useState(false);
    const [dayLimit, setDayLimit] = useState(false);
    const navigate = useNavigate();

    const presentsRef = useRef(null);

    const [openReport, setOpenReport] = useState(false);

    const [swipeStart, setSwipeStart] = useState(0);
    const [swipeDiff, setSwipeDiff] = useState(0);
    const reportMenuRef = useRef(null);
    const blockUserRef = useRef(null);

    const handleTouchStart = (e) => {
        setSwipeStart(e.touches[0].clientY);
        setSwipeDiff(0);
    };

    const handleTouchMove = (e) => {
        const swipeEnd = e.touches[0].clientY;
        const diff = swipeEnd - swipeStart;

        if (diff > 0) {
            setSwipeDiff(diff);
        }

        e.stopPropagation();
        e.preventDefault();
    };

    const handleTouchEnd = () => {
        if (swipeDiff > 20) {
            setReportMenu(false);
            setBlockUser(false);
            setPresentsShop(false);
            //setOpenReport(false);
        } else {
            setSwipeDiff(0);
        }
    };


    return (
        <div>
            {showInstruction && (
                <div
                    className={`z-[40] w-[100vw] h-[100vh] pt-[450px] pb-[100px] fixed flex justify-center items-center flex-col bg-black/80 backdrop-blur-[10px] overflow-y-scroll`}
                >
                    <h1 className="font-raleway font-bold mt-6 text-white text-[26px]">
                        Инструкция
                    </h1>
                    <h1 className="font-raleway font-light mt-2 text-white text-center text-[18px]">
                        Основные функции и жесты
                    </h1>
                    <div className="grid grid-cols-1 justify-center flex-wrap items-center gap-[16px] mt-[16px]">
                        {INSTRUCTIONS_MEET.map((ins) => (
                            <div
                                key={ins.id}
                                className={`w-[343px] h-[120px] gap-[12px] border-b border-[#6D6D6D] flex text-white`}
                            >
                                <div className="h-[89px] flex justify-center items-center">
                                    <img alt={ins.title} src={ins.svg} className="w-[40px] h-[40px]" />
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
                    <div className="mt-[20px] mb-2 z-[9999]">
                        <Button
                            onclick={() => setShowInstruction(false)}
                        >
                            Понятно
                        </Button>
                    </div>
                </div>
            )}
            <div className="relative h-[100%]">
                <div className="w-[100%] pt-[100px] pb-[80px] flex flex-col !items-center">

                    <div className="z-0 w-full flex justify-center items-center flex-col">
                        <div className="w-[343px] flex flex-row ">
                            <img
                                alt="Назад"
                                src="/icons/Button-back.svg"
                                onClick={() => {navigate(-1)}}
                                className="mt-3 w-[44px] h-[44px]"
                            />
                            <div className="flex flex-row justify-end flex-grow">
                                <img
                                    alt="Точки"
                                    src="/icons/Button-dots.svg"
                                    onClick={() => {setOpenToast(!openToast)}}
                                    className="mt-3 ml-3 w-[44px] h-[44px]"
                                />
                            </div>
                        </div>
                        <div></div>
                        <div className="w-[100%] flex justify-center align-center mt-4">
                            <div className="relative w-[343px] rounded-[16px]">


                                <div className="w-full relative">
                                    <div
                                        className="custom-pagination"
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            zIndex: 10,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                        }}
                                    ></div>
                                </div>
                                <Swiper
                                    modules={[Pagination]}
                                    spaceBetween={0}
                                    slidesPerView={1}
                                    className="h-[560px]"

                                    pagination={{
                                        el: '.custom-pagination'
                                    }}

                                >
                                    <SwiperSlide>
                                        <img
                                            alt="Аватар"
                                            src="/mock/user_1/mock_user_avatar_1_1.png"
                                            className="z-[1] w-[363px] h-[544px] rounded-[16px] object-cover"
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img
                                            alt="Аватар"
                                            src="/mock/user_1/mock_user_avatar_1_1.png"
                                            className="z-[1] w-[363px] h-[544px] rounded-[16px] object-cover"
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img
                                            alt="Avatar"
                                            src="/mock/user_1/mock_user_avatar_1_1.png"
                                            className="z-[1] w-[363px] h-[544px] rounded-[16px] object-cover"
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img
                                            alt="Аватар"    
                                            src="/mock/user_1/mock_user_avatar_1_1.png"
                                            className="z-[1] w-[363px] h-[544px] rounded-[16px] object-cover"
                                        />
                                    </SwiperSlide>
                                </Swiper>

                                <div
                                    className="z-[8] translate-y-[-120px] absolute w-[100%] flex items-center justify-center">
                                    <div className="w-[338px] h-[70px] mb-4 flex gap-[16px] flex-row justify-center items-center">
                                        <div
                                            className={`w-[58px] h-[58px] rounded-[50%] flex justify-center items-center`}
                                            onClick={() => {
                                                setDayLimit(true)
                                            }}
                                        >
                                            <img
                                                alt="Фото"
                                                src="/icons/photo_overlay_button_4.svg"
                                                className="w-[58px] h-[58px]"
                                            />
                                        </div>
                                        <div
                                            className={`w-[58px] h-[58px] rounded-[50%] flex justify-center items-center`}
                                            onClick={() => {
                                                setPresentsShop(true)
                                            }}
                                        >
                                            <img alt="Фото" src="/icons/photo_overlay_button_5.svg" className="w-[58px] h-[58px]"/>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="shadow-[0_-25px_30px_rgba(0,0,0,0.9)] rounded-[16px] rounded-t-none relative z-[5] flex flex-col pl-[24px] pr-[24px] bg-[#010D0D] translate-y-[-27px] drop-shadow-[0_0_30px_0_rgb(0,0,0)]">
                                    <h1 className="font-raleway font-bold mt-6 text-white text-[26px]">
                                        Наташа, 25 лет
                                    </h1>
                                    <h1 className="font-raleway font-light mt-2 text-white text-[18px]">
                                        Минск, Беларусь
                                    </h1>
                                    <div className="border-b-2 border-white/30 pt-5"/>
                                    <h1 className="font-raleway font-bold mt-6 text-white text-[18px]">
                                        Цель знакомства
                                    </h1>
                                    <h1 className="font-raleway font-light mt-2 text-white text-[18px]">
                                        Серьезные отношения
                                    </h1>
                                    <h1 className="font-raleway font-bold mt-6 text-white text-[18px]">
                                        Аудио визитка
                                    </h1>
                                    <img
                                        alt="Аудио визитка"
                                        src="/icons/user_voice_message.svg"
                                        className="w-[295px] h-[64px] mt-2"
                                    />
                                    <h1 className="font-raleway font-bold mt-6 text-white text-[18px]">
                                        Интересы
                                    </h1>
                                    <h1 className="font-raleway font-light mt-2 text-white text-[18px]">
                                        Джин с тоником, Гимнастика, Горячая йога, Spotify, Суши{" "}
                                    </h1>
                                    <h1 className="font-raleway font-bold mt-6 text-white text-[18px]">
                                        Подарки
                                    </h1>
                                    <div>
                                        <Swiper
                                            modules={[]}
                                            spaceBetween={10}
                                            slidesPerView={2}
                                            className="h-[170px]"
                                        >
                                            <SwiperSlide
                                                className="w-[130px] !h-[130px] rounded-[16px] mt-2 !flex justify-center items-center bg-[#FFFFFF1A]">
                                                <img
                                                    alt="Podarok"
                                                    src="/icons/present.svg"
                                                    className="w-[80px] h-[80px]"
                                                />
                                            </SwiperSlide>
                                            <SwiperSlide
                                                className="w-[130px] !h-[130px] rounded-[16px] mt-2 !flex justify-center items-center bg-[#FFFFFF1A]">
                                                <img
                                                    alt="Podarok"
                                                    src="/icons/present.svg"
                                                    className="w-[80px] h-[80px]"
                                                />
                                            </SwiperSlide>
                                            <SwiperSlide
                                                className="w-[130px] !h-[130px] rounded-[16px] mt-2 !flex justify-center items-center bg-[#FFFFFF1A]">
                                                <img
                                                    alt="Podarok"
                                                    src="/icons/present.svg"
                                                    className="w-[80px] h-[80px]"
                                                />
                                            </SwiperSlide>
                                            <SwiperSlide
                                                className="w-[130px] !h-[130px] rounded-[16px] mt-2 !flex justify-center items-center bg-[#FFFFFF1A]">
                                                <img
                                                    alt="Podarok"
                                                    src="/icons/present.svg"
                                                    className="w-[80px] h-[80px]"
                                                />
                                            </SwiperSlide>
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {openToast && (
                        <div
                            className='absolute top-[115px] left-[15px] border border-[#233636] rounded-[12px] h-[180px] w-[291px] bg-[#1A2626] text-white'>
                            <div
                                className="w-full border-b border-[#233636] h-[60px] flex items-center justify-between pl-[16px] pr-[16px]"
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator
                                            .share({
                                                title: "Поделиться профилем",
                                                text: "Поделитесь своим профилем",
                                                url: window.location.href,
                                            })
                                            .then(() => console.log("Успешно поделились"))
                                            .catch((error) => console.log("Ошибка при отправке:", error));
                                    } else {
                                        alert("Ваш браузер не поддерживает данную функцию");
                                    }
                                }}
                            >
                                <span>Поделиться</span><img alt="Поделиться" src='/icons/share.svg'/>
                            </div>
                            <div
                                className="w-full border-b border-[#233636] h-[60px] flex items-center justify-between pl-[16px] pr-[16px]"
                                onClick={() => {
                                    setReportMenu(true)
                                }}>
                                <span>Пожаловаться</span><img alt="Пожаловаться" src='/icons/report.svg'/>
                            </div>
                            <div className="w-full h-[60px] flex items-center justify-between pl-[16px] pr-[16px]"
                                 onClick={() => {setBlockUser(true)}}>
                                <span>Заблокировать</span><img alt="Заблокировать" src='/icons/block_user.svg'/>
                            </div>
                        </div>
                    )}
                    {reportMenu && (
                        <div
                            className="fixed inset-0 bg-opacity-50 flex justify-center items-end z-20 bg-black/80 backdrop-blur-[10px]"
                            style={{ pointerEvents: "none" }}
                            onClick={() => {
                                setReportMenu(false)
                            }}
                        >
                            <div
                                className="w-full rounded-t-2xl transform transition-transform duration-300 translate-y-0"
                                style={{
                                    transform: `translateY(${swipeDiff}px)`,
                                    transition: swipeDiff ? "none" : "transform 0.3s ease-out",
                                    pointerEvents: "auto", // Включаем взаимодействие только с контентом
                                }}
                                onClick={(e) => e.stopPropagation()}
                                ref={reportMenuRef}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >
                                {/* Хендл для удобного захвата */}
                                <div
                                    className="w-16 h-2 bg-gray-400 rounded-full mx-auto my-3 cursor-pointer"
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                ></div>
                                {/*<ReportMenu/>*/}
                                <div
                                    className="w-[100%] h-[640px] bg-[#043939] flex flex-col justify-start items-center fixed bottom-0 overflow-y-scroll z-20 text-white"
                                    style={{borderRadius: "32px 32px 0 0 "}}>
                                    <div
                                        className="bg-[#0b6666] w-[80px] h-[6px] rounded-[20px] mt-[12px] text-[#043939]">
                                        .
                                    </div>


                                    {!openReport ?
                                        <>
                                            <div className="flex flex-col justify-start items-center w-full mt-[40px]">
                                                <p className="font-semibold text-[22px]">Пожаловаться</p>
                                                <p className="font-normal text-[16px]">Это останется между нами</p>
                                            </div>

                                            <div className='w-full pr-[16px] pl-[16px]'>
                                                <div className='border-b border-[#6D6D6D] h-[60px] flex items-center'
                                                     onClick={() => setOpenReport(!openReport)}>
                                                    <span>Фейк</span>
                                                </div>
                                                <div className='border-b border-[#6D6D6D] h-[60px] flex items-center'
                                                     onClick={() => setOpenReport(!openReport)}>
                                                    <span>Неприемлемый контент</span>
                                                </div>
                                                <div className='border-b border-[#6D6D6D] h-[60px] flex items-center'
                                                     onClick={() => setOpenReport(!openReport)}>
                                                    <span>Возраст</span>
                                                </div>
                                                <div className='border-b border-[#6D6D6D] h-[60px] flex items-center'
                                                     onClick={() => setOpenReport(!openReport)}>
                                                    <span>Оскорбления</span>
                                                </div>
                                                <div className='border-b border-[#6D6D6D] h-[60px] flex items-center'
                                                     onClick={() => setOpenReport(!openReport)}>
                                                    <span>Поведение вне MYTA</span>
                                                </div>
                                                <div className='h-[60px] flex items-center'
                                                     onClick={() => setOpenReport(!openReport)}>
                                                    <span>Мошенничество или спам</span>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <div className="flex flex-col justify-start items-center w-full mt-[40px]">
                                            <img alt="Заблокировать" src='/icons/Layer_1.svg' className='w-[80px] h-[80px]'/>
                                            <p className='text-center w-[300px] mt-[30px] font-semibold text-[22px]'>Вы
                                                действительно хотите заблокировать данного пользователя?</p>
                                            <p className='text-center text-[16px] mt-[20px] font-normal pl-2 pr-2'>Заблокированный
                                                пользователь больше не сможет видеть ваш профиль и общаться с вами через
                                                наше приложение. Мы скроем профиль, чат и уведомления от этого
                                                пользователя</p>
                                            <div className='text-black mt-[40px]'>
                                                <Button onclick={() => setOpenReport(!openReport)}>
                                                    Заблокировать
                                                </Button>
                                            </div>
                                            {/*<div className='text-[#FFFFFF] opacity-50 mt-[20px]' onClick={() => {setReportMenu(false)}}>Отмена</div>*/}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                    {blockUser && (
                        <div
                            className="fixed inset-0 bg-opacity-50 flex justify-center items-end z-20 bg-black/80 backdrop-blur-[10px]"
                            style={{pointerEvents: "none"}}
                            onClick={() => {
                                setReportMenu(false)
                            }}
                        >
                            <div
                                className="w-full rounded-t-2xl transform transition-transform duration-300 translate-y-0"
                                style={{
                                    transform: `translateY(${swipeDiff}px)`,
                                    transition: swipeDiff ? "none" : "transform 0.3s ease-out",
                                    pointerEvents: "auto",
                                }}
                                onClick={(e) => e.stopPropagation()}
                                ref={blockUserRef}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >
                                <div
                                    className="w-16 h-2 bg-gray-400 rounded-full mx-auto my-3 cursor-pointer"
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                ></div>
                                <div
                                    className="w-[100%] h-[740px] bg-[#043939] flex flex-col justify-start items-center fixed bottom-0 overflow-y-scroll z-20 text-white"
                                    style={{borderRadius: "32px 32px 0 0 "}}>
                                    <div
                                        className="bg-[#0b6666] w-[80px] h-[6px] rounded-[20px] mt-[12px] text-[#043939]">
                                        .
                                    </div>


                                    {!openReport ?
                                        <div className="flex flex-col justify-start items-center w-full mt-[40px]">
                                            <img alt="Заблокировать" src='/icons/Layer_1.svg' className='w-[80px] h-[80px]'/>
                                            <p className='text-center w-[300px] mt-[30px] font-semibold text-[22px]'>Вы
                                                действительно хотите заблокировать данного пользователя?</p>
                                            <p className='text-center text-[16px] mt-[20px] font-normal pl-2 pr-2'>Заблокированный
                                                пользователь больше не сможет видеть ваш профиль и общаться с вами через
                                                наше приложение. Мы скроем профиль, чат и уведомления от этого
                                                пользователя</p>
                                            <div className='text-black mt-[40px]'>
                                                <Button onclick={() => setOpenReport(!openReport)}>
                                                    Заблокировать
                                                </Button>
                                            </div>
                                            <div className='text-[#FFFFFF] opacity-50 mt-[20px]' onClick={() => {
                                                setBlockUser(false);
                                                setOpenReport(true);
                                            }}>Отмена
                                            </div>
                                        </div>
                                        :
                                        <div className="flex flex-col justify-start items-center w-full mt-[40px]">
                                            <img alt="Успешно" src='/icons/blocked_success.svg' className='w-[80px] h-[80px]'/>
                                            <p className='text-center w-[300px] mt-[30px] font-semibold text-[22px]'>Пользователь
                                                был успешно заблокирован! Больше вас не побеспокоят</p>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                    {presentsShop && (
                        <div
                            className="fixed inset-0 bg-opacity-50 flex justify-center items-end z-20 bg-black/80 backdrop-blur-[10px]"
                            style={{ pointerEvents: "none" }}
                            onClick={() => {
                                setPresentsShop(false)
                            }}
                        >
                            <div
                                className="w-full rounded-t-2xl transform transition-transform duration-300 translate-y-0"
                                style={{
                                    transform: `translateY(${swipeDiff}px)`,
                                    transition: swipeDiff ? "none" : "transform 0.3s ease-out",
                                    pointerEvents: "auto", // Включаем взаимодействие только с контентом
                                }}
                                onClick={(e) => e.stopPropagation()}
                                ref={presentsRef}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >
                                {/* Хендл для удобного захвата */}
                                <div
                                    className="w-16 h-2 bg-gray-400 rounded-full mx-auto my-3 cursor-pointer"
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                ></div>
                                <PresentsShop />
                            </div>
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
                </div>
            </div>
        </div>
    );
}

export default Streamer;
