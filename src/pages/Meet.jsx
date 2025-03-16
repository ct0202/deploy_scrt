import React, {useState, useEffect, useRef} from "react";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

import { Navigation } from "../components/shared/Navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./styles/SwiperCustomPagination.css";

import { INSTRUCTIONS_MEET } from "../constants/instructions";

import DayLimit from "../components/shared/DayLimit";
import PresentsShop from "../components/shared/PresentsShop";

function Meet() {
  const [showToast, setShowToast] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);
  const [animateClass, setAnimateClass] = useState("animate-slideDown");
  const [menuAction, setMenuAction] = useState(1);
  const [dayLimit, setDayLimit] = useState(false);
  const [presentsShop, setPresentsShop] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isFirstVisit = localStorage.getItem("firstVisit");

    if (!isFirstVisit) {
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

      localStorage.setItem("firstVisit", "true");
    }
  }, []);

  const [swipeStart, setSwipeStart] = useState(0);
  const [swipeDiff, setSwipeDiff] = useState(0);
  const presentsRef = useRef(null);

  const handleTouchStart = (e) => {
    setSwipeStart(e.touches[0].clientY);
    setSwipeDiff(0); // Сбрасываем разницу
  };

  const handleTouchMove = (e) => {
    const swipeEnd = e.touches[0].clientY;
    const diff = swipeEnd - swipeStart;

    if (diff > 0) {
      setSwipeDiff(diff); // Обновляем сдвиг только вниз
    }

    e.stopPropagation();
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    if (swipeDiff > 20) {
      setPresentsShop(false);
    } else {
      setSwipeDiff(0); // Возвращаем обратно, если свайп не был достаточно длинным
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
            src="/icons/Button-menu.svg"
            className="mt-3 w-[44px] h-[44px]"
            onClick={() => navigate("/profileMenu")}
          />
          <div className="flex flex-row justify-end flex-grow">
            <img
              src="/icons/Button-filters.svg"
              className="mt-3 ml-3 w-[119px] h-[44px]"
              onClick={() => {navigate('/filters')}}
            />

            <img
              src="/icons/Button-instruction.svg"
              className="mt-3 ml-3 w-[44px] h-[44px]"
              onClick={()=> {setShowInstruction(true)}}
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

              pagination = {{
                el: '.custom-pagination'
              }}

            >
              <SwiperSlide>
                <img
                    src="/mock/user_1/mock_user_avatar_1_1.png"
                    className="z-[1] w-[363px] h-[544px] rounded-[16px] object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                    src="/mock/user_1/mock_user_avatar_1_1.png"
                    className="z-[1] w-[363px] h-[544px] rounded-[16px] object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                    src="/mock/user_1/mock_user_avatar_1_1.png"
                    className="z-[1] w-[363px] h-[544px] rounded-[16px] object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                    src="/mock/user_1/mock_user_avatar_1_1.png"
                    className="z-[1] w-[363px] h-[544px] rounded-[16px] object-cover"
                />
              </SwiperSlide>
            </Swiper>
            {/*<img*/}
            {/*  src="/mock/user_1/mock_user_avatar_1_1.png"*/}
            {/*  className="z-[1] w-[363px] h-[544px] rounded-[16px] object-cover"*/}
            {/*/>*/}


            <div className="z-[8] translate-y-[-120px] absolute w-[100%] flex items-center justify-center">
              <div className="w-[338px] h-[70px] mb-4 flex flex-row justify-evenly items-center">
                <div
                    className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center`}
                >
                  <img
                      src="/icons/photo_overlay_button_1.svg"
                      className="w-[48px] h-[48px]"
                  />
                </div>
                <div
                    className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center`}
                >
                  <img
                      src="/icons/photo_overlay_button_2.svg"
                      className=" w-[58px] h-[58px]"
                  />
                </div>
                <div
                    className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center`}
                >
                  <img
                      src="/icons/photo_overlay_button_3.svg"
                      className=" w-[64px] h-[64px]"
                  />
                </div>
                <div
                    className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center`}
                    onClick = {() => {setDayLimit(true)}}
                >
                  <img
                      src="/icons/photo_overlay_button_4.svg"
                      className="w-[58px] h-[58px]"
                  />
                </div>
                <div
                    className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center`}
                    onClick = {() => {setPresentsShop(true)}}
                >
                  <img src="/icons/photo_overlay_button_5.svg" className="w-[48px] h-[48px]" />
                </div>
              </div>
            </div>


            <div className="shadow-[0_-25px_30px_rgba(0,0,0,0.9)] rounded-[16px] rounded-t-none relative z-[5] flex flex-col pl-[24px] pr-[24px] bg-[#010D0D] translate-y-[-27px] drop-shadow-[0_0_30px_0_rgb(0,0,0)]">
              <h1 className="font-raleway font-bold mt-6 text-white text-[26px]">
                Наташа, 25 лет
              </h1>
              <h1 className="font-raleway font-light mt-2 text-white text-[18px]">
                Минск, Беларусь
              </h1>
              <div className="border-b-2 border-white/30 pt-5" />
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
                  <SwiperSlide className="w-[130px] !h-[130px] rounded-[16px] mt-2 !flex justify-center items-center bg-[#FFFFFF1A]">
                    <img
                      src="/icons/present.svg"
                      className="w-[80px] h-[80px]"
                    />
                  </SwiperSlide>
                  <SwiperSlide className="w-[130px] !h-[130px] rounded-[16px] mt-2 !flex justify-center items-center bg-[#FFFFFF1A]">
                    <img
                      src="/icons/present.svg"
                      className="w-[80px] h-[80px]"
                    />
                  </SwiperSlide>
                  <SwiperSlide className="w-[130px] !h-[130px] rounded-[16px] mt-2 !flex justify-center items-center bg-[#FFFFFF1A]">
                    <img
                      src="/icons/present.svg"
                      className="w-[80px] h-[80px]"
                    />
                  </SwiperSlide>
                  <SwiperSlide className="w-[130px] !h-[130px] rounded-[16px] mt-2 !flex justify-center items-center bg-[#FFFFFF1A]">
                    <img
                      src="/icons/present.svg"
                      className="w-[80px] h-[80px]"
                    />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 z-[6] w-[100%] flex items-center justify-center">
          {/* <div className="w-[338px] h-[70px] mb-4 bg-[#022424] flex flex-row justify-evenly items-center rounded-[400px]">
            <div
              className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center ${
                menuAction === 1 ? "bg-[#FFFFFF1A]" : "bg-transparent"
              }`}
              onClick={() => {
                setMenuAction(1);
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
                navigate("/Chat");
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
          </div> */}
          <Navigation tab={1} />
        </div>
      </div>
      {showToast && (
        <div
          className={`z-[30] w-[343px] fixed font-light mt-2  text-white flex justify-center items-center flex-wrap font-raleway gap-[5px] text-[16px] px-4 py-2 rounded-lg bg-[#043939] border-[1.5px] border-[#a1f69e] ${animateClass}`}
        >
          Вам начислено: <span className="text-[18px] font-medium">+100</span>{" "}
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

    </div>
      </div>
      </div>
  );
}

export default Meet;
