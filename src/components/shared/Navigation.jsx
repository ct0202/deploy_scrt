import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navigation = ({tab}) => {
    
    const navigate = useNavigate();
    
    const [menuAction, setMenuAction] = useState(tab);

    return (
        <div className="w-[338px] h-[70px] mb-4 bg-[#022424] flex flex-row justify-evenly items-center rounded-[400px]">
            <div
              className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center ${
                menuAction === 1 ? "bg-[#FFFFFF1A]" : "bg-transparent"
              }`}
              onClick={() => {
                setMenuAction(1);
                navigate("/Meet")
              }}
            >
              <img
                src="/icons/bottom_bar_button_1.svg"
                className="w-[24px] h-[24px]"
                alt="Главная страница"
              />
            </div>
            <div
              className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center ${
                menuAction === 2 ? "bg-[#FFFFFF1A]" : "bg-transparent"
              }`}
              onClick={() => {
                setMenuAction(2);
                navigate("/roulette-test");
              }}
            >
              <img
                src="/icons/bottom_bar_button_2.svg"
                className=" w-[24px] h-[24px]"
                alt="Чаты"
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
                alt="Знакомства"
              />
            </div>
            <div
              className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center ${
                menuAction === 4 ? "bg-[#FFFFFF1A]" : "bg-transparent"
              }`}
              onClick={() => {
                setMenuAction(4);
                navigate("/chats")
              }}
            >
              <img
                src="/icons/bottom_bar_button_4.svg"
                className="w-[24px] h-[24px]"
                alt="Профиль"
              />
            </div>
            <div
              className={`w-[64px] h-[64px] rounded-[50%] flex justify-center items-center ${
                menuAction === 5 ? "bg-[#FFFFFF1A]" : "bg-transparent"
              }`}
              onClick={() => {
                setMenuAction(5);
                  navigate("/mytaidea");
              }}
            >
              <img src="/icons/myta-coin.svg" className="w-[24px] h-[24px]" alt="Монета MYTA" />
            </div>
          </div>
    );
};