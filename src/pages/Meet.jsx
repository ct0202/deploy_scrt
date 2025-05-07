import React, {useState, useEffect, useRef} from "react";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from '../axios';
import config from '../config';
import { useDispatch, useSelector } from 'react-redux';

import { Navigation } from "../components/shared/Navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./styles/SwiperCustomPagination.css";

import { INSTRUCTIONS_MEET } from "../constants/instructions";

import DayLimit from "../components/shared/DayLimit";
import PresentsShop from "../components/shared/PresentsShop";
import VoiceProgress from "../components/ui/VoiceProgress";
import ListenVoice from "../components/ui/ListenVoice";

function Meet() {
  const [showToast, setShowToast] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);
  const [animateClass, setAnimateClass] = useState("animate-slideDown");
  const [menuAction, setMenuAction] = useState(1);
  const [dayLimit, setDayLimit] = useState(false);
  const [presentsShop, setPresentsShop] = useState(false);
  const [potentialMatches, setPotentialMatches] = useState([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const { userId } = useSelector(state => state.auth);

  const navigate = useNavigate();

  const handleDislike = async (userId) => {
    try {
      await axiosPrivate.post(config.API.MATCHES.REJECT(userId));
      if (currentMatchIndex < potentialMatches.length - 1) {
        setCurrentMatchIndex(prevIndex => prevIndex + 1);
      } else {
        // If we've reached the end of potential matches, fetch more
        fetchPotentialMatches();
      }
    } catch (error) {
      console.error('Error rejecting match:', error);
    }
  };

  const fetchPotentialMatches = async () => {
    try {
      console.log('Fetching potential matches...');
      const response = await axiosPrivate.get(config.API.MATCHES.POTENTIAL);
      console.log('Potential matches response:', response.data);
      
      if (response.data && response.data.data && response.data.data.users) {
        console.log('Setting potential matches:', response.data.data.users);
        setPotentialMatches(response.data.data.users);
        setCurrentMatchIndex(0); // Reset to first match when fetching new ones
      } else {
        console.warn('Unexpected response structure:', response.data);
        setPotentialMatches([]);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching potential matches:', err);
      setError(err.message);
      setLoading(false);
    }
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

  useEffect(() => {
    fetchPotentialMatches();
  }, []);

  useEffect(() => {
    const isFirstVisit = localStorage.getItem("firstVisit3");
    if (!isFirstVisit) {
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
      localStorage.setItem("firstVisit3", "true");
    }
  }, []);

  const [swipeStart, setSwipeStart] = useState(0);
  const [swipeDiff, setSwipeDiff] = useState(0);
  const presentsRef = useRef(null);

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
      setPresentsShop(false);
    } else {
      setSwipeDiff(0);
    }
  };

  const handlePlayAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  

  const currentMatch = potentialMatches[currentMatchIndex];
  console.log('Current match:', currentMatch);

  return (
    <div>
      {showInstruction && (
        <div className={`z-[40] w-[100vw] h-[100vh] pb-[100px] fixed flex justify-start items-center flex-col bg-black/80 backdrop-blur-[10px] overflow-y-scroll`}>
          <h1 className="font-raleway font-bold text-white text-[26px] mt-[90px]">
            Инструкция
          </h1>
          <h1 className="font-raleway font-light mt-2 text-white text-center text-[18px]">
            Основные функции и жесты
          </h1>
          <div className="grid grid-cols-1 justify-center flex-wrap items-center gap-[16px] mt-[16px]">
            {INSTRUCTIONS_MEET.map((ins, index) => (
              <div
                key={ins.id}
                className={`w-[343px] pt-[10px] pb-[10px] gap-[12px] border-b ${
                  index === INSTRUCTIONS_MEET.length - 1 ? "border-none" : "border-[#6D6D6D]"
                } flex text-white`}
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
            <Button onclick={() => setShowInstruction(false)}>
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
                alt="Меню"
                className="mt-3 w-[44px] h-[44px]"
                onClick={() => navigate("/profileMenu")}
              />
              <div className="flex flex-row justify-end flex-grow">
                <img
                  src="/icons/Button-filters.svg"
                  alt="Фильтры"
                  className="mt-3 ml-3 w-[119px] h-[44px]"
                  onClick={() => {navigate('/filters')}}
                />
                <img
                  src="/icons/Button-instruction.svg"
                  alt="Инструкция"
                  className="mt-3 ml-3 w-[44px] h-[44px]"
                  onClick={()=> {setShowInstruction(true)}}
                />
                <img
                  src="/icons/Button-notifications.svg"
                  alt="Уведомления"
                  className="mt-3 ml-3 w-[44px] h-[44px]"
                  onClick={() => {navigate('/notifications')}}
                />
              </div>
            </div>
            <div></div>
            <div className="w-[100%] flex justify-center align-center mt-4">
              {
                loading ?
                      <div className="flex items-center justify-center h-screen">
                        <div className="text-white">Loading potential matches...</div>
                      </div>
                :  ( error ?
                  <div className="flex items-center justify-center h-screen">
                    <div className="text-white">Error: {error}</div>
                  </div>
                : (potentialMatches.length === 0 ?
                    <div className="flex items-center justify-center h-screen">
                      <div className="text-white">No potential matches found</div>
                    </div>
                  :
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
                <div className="h-[560px]">
                  <img
                    src={currentMatch.photos && currentMatch.photos[0] 
                      ? currentMatch.photos[0] 
                      : "/mock/user_1/mock_user_avatar_1_1.png"}
                    className="z-[1] w-[363px] h-[544px] rounded-[16px] object-cover"
                    alt={`Profile of ${currentMatch.name}`}
                    onError={(e) => {
                      console.error('Error loading image:', e.target.src);
                      e.target.src = "/mock/user_1/mock_user_avatar_1_1.png";
                    }}
                  />
                </div>

                <div className="z-[8] translate-y-[-120px] absolute w-[100%] flex items-center justify-center">
                  <div className="w-[338px] h-[70px] mb-4 flex flex-row justify-evenly items-center">
                    <div 
                      className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center`}
                      onClick={() => handleDislike(currentMatch._id)}
                    >
                      <img
                        src="/icons/photo_overlay_button_1.svg"
                        alt="Dislike"
                        className="w-[48px] h-[48px]"
                      />
                    </div>
                    <div className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center`}>
                      <img
                        src="/icons/photo_overlay_button_2.svg"
                        alt="Кнопка 2"
                        className="w-[58px] h-[58px]"
                      />
                    </div>
                    <div className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center`}>
                      <img
                        src="/icons/photo_overlay_button_3.svg"
                        alt="Кнопка 3"
                        className="w-[64px] h-[64px]"
                      />
                    </div>
                    <div
                      className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center`}
                      onClick={() => {setDayLimit(true)}}
                    >
                      <img
                        src="/icons/photo_overlay_button_4.svg"
                        alt="Кнопка 4"
                        className="w-[58px] h-[58px]"
                      />
                    </div>
                    <div
                      className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center`}
                      onClick={() => {setPresentsShop(true)}}
                    >
                      <img 
                        src="/icons/photo_overlay_button_5.svg" 
                        alt="Кнопка 5"
                        className="w-[48px] h-[48px]" 
                      />
                    </div>
                  </div>
                </div>

                <div className="shadow-[0_-25px_30px_rgba(0,0,0,0.9)] rounded-[16px] rounded-t-none relative z-[5] flex flex-col pl-[24px] pr-[24px] bg-[#010D0D] translate-y-[-27px] drop-shadow-[0_0_30px_0_rgb(0,0,0)]">
                  <h1 className="font-raleway font-bold mt-6 text-white text-[26px]">
                    {currentMatch.name}, {new Date().getFullYear() - new Date(currentMatch.birthDay).getFullYear()} лет
                  </h1>
                  <h1 className="font-raleway font-light mt-2 text-white text-[18px]">
                    {currentMatch.city}, {currentMatch.country}
                  </h1>
                  <div className="border-b-2 border-white/30 pt-5" />
                  <h1 className="font-raleway font-bold mt-6 text-white text-[18px]">
                    Цель знакомства
                  </h1>
                  <h1 className="font-raleway font-light mt-2 text-white text-[18px]">
                    {currentMatch.purpose}
                  </h1>
                  <h1 className="font-raleway font-bold mt-6 text-white text-[18px]">
                    Аудио визитка
                  </h1>
                  <div className="mt-2">
                    <ListenVoice preSignedAudio={currentMatch.audioMessage} />
                  </div>
                  <h1 className="font-raleway font-bold mt-6 text-white text-[18px]">
                    Интересы
                  </h1>
                  <h1 className="font-raleway font-light mt-2 text-white text-[18px]">
                    {Array.isArray(currentMatch.interests) 
                      ? currentMatch.interests
                          .map(interest => interest.replace(/^"|"$/g, ''))
                          .join(", ")
                      : typeof currentMatch.interests === 'string'
                        ? currentMatch.interests
                            .replace(/^\[|\]$/g, '')
                            .split(',')
                            .map(interest => interest.trim().replace(/^"|"$/g, ''))
                            .join(", ")
                        : currentMatch.interests}
                  </h1>
                </div>
              </div>
              ) 
            )
              } 
            </div>
            <div className="fixed bottom-0 z-[6] w-[100%] flex items-center justify-center">
              <Navigation tab={1} />
            </div>
          </div>
          {showToast && handleAddMytaCoins(100) && (
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
                  pointerEvents: "auto",
                }}
                onClick={(e) => e.stopPropagation()}
                ref={presentsRef}
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
