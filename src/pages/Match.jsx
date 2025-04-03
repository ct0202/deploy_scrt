import React from "react";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "./styles/SwiperCustomPagination.css";
import background from "../assets/background.svg";


function Chat() {
    const navigate = useNavigate();


    return (
        <div className="w-[100%] h-[100%] pt-[70px] flex flex-col font-raleway !items-center overflow-x-hidden">
            <img src={background} alt="" className="absolute w-[100vw] z-0" />
            <div>
                <img className="
                        w-[160px] h-[200px]
                        z-[10]
                        absolute
                        top-[270px] left-[50px]
                        "
                     src="/mock/user_5/mock_user_avatar_5_1.png"/>
                <img className="
                        w-[160px] h-[200px]
                        z-[7]
                        absolute
                        top-[250px] left-[160px]
                        "
                     src="/mock/user_1/user_1_match.png"/>
                <img className="w-[48px] h-[48px]
                        z-[15]
                        absolute
                        top-[350px] left-[165px]
                        "
                     src="/icons/match_heart.svg" />
            </div>
            <div className="absolute width-[100%] pr-1 pl-1 text-center font-raleway font-semibold text-[26px] text-white top-[500px]">
                Это взаимно! Не упусти шанс, напиши первым
            </div>
            <div className="absolute bottom-[40px]">
                <Button><img src="/icons/chat-bubble-typing.svg" className="inline mr-1 mb-1 w-[18px] h-[18px]"/>Написать</Button>
                <p className="text-center mt-4 text-[white] font-raleway opacity-20" onClick={() => {navigate(-1)}}>Не сейчас</p>
            </div>
            <img src="/icons/photo_overlay_button_1.svg" alt="Кнопка 1" className="w-[48px] h-[48px]" />
            <img src="/icons/photo_overlay_button_2.svg" alt="Кнопка 2" className="w-[48px] h-[48px]" />
            <img src="/icons/photo_overlay_button_3.svg" alt="Кнопка 3" className="w-[48px] h-[48px]" />
            <img src="/icons/photo_overlay_button_4.svg" alt="Кнопка 4" className="w-[48px] h-[48px]" />
        </div>
    );
}

export default Chat;
