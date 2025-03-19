import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";


function MeetGoal() {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("step4Data")) || {};
        setSelectedOption(storedData.purpose || null);
    }, []);

    const handleSelect = (optionId) => {
        localStorage.setItem("step4Data", JSON.stringify({ purpose: optionId }));
        setSelectedOption(optionId);
    };

    const options = [
        {
            id: 1,
            title: "Флирт и свидания",
            description: "Ходить на свидания и хорошо проводить время",
            emoji: "🔥",
        },
        {
            id: 2,
            title: "Серьёзные отношения",
            description: "Найти вторую половинку и создать счастливые отношения",
            emoji: "💍",
        },
        {
            id: 3,
            title: "Дружеское общение",
            description: "Найти друзей и знакомых, общаться и договариваться о встречах",
            emoji: "✌️",
        },
        {
            id: 4,
            title: "Обо всём и ни о чём",
            description: "Общаться, делиться мыслями и идеями без ограничений",
            emoji: "🥂",
        },
    ];

    return (
        <div className="w-[100vw] flex flex-col justify-center items-center">
        <div className="flex flex-col items-center w-[343px] h-[100%] overflow-x-hidden ">
            <div className='mt-[90px] mb-[30px] w-full pr-[16px] pl-[16px] flex-row text-[18px] flex justify-between'>
                <span className='text-white' onClick={() => {navigate(-1)}}>Отмена</span>
                <span className='text-[#A1F69E]' onClick={() => {navigate(-1)}}>Сохранить</span>
            </div>
            <h1 className="font-raleway font-semibold mt-6 text-white text-[20px]">
                Расскажите, для чего вы здесь
            </h1>
            <h1 className="font-raleway font-light mt-2 text-white text-center text-[16px]">
                Можно изменить в любой момент
            </h1>
            <div className="grid grid-cols-1 justify-start flex-wrap items-center gap-[16px] mt-[16px]">
                {options.map((option) => (
                    <div
                        key={option.id}
                        onClick={() => handleSelect(option.id)}
                        className={`w-[343px] h-[89px] rounded-[8px] flex text-white cursor-pointer transition-all 
            ${
                            selectedOption === option.id
                                ? "bg-[#043939] border-[1.5px] border-[#a1f69e]"
                                : "bg-[#022424] border-[1px] border-[#233636]"
                        }`}
                    >
            <span className="flex items-center justify-center text-[32px] w-[60px] h-[89px] text-center">
              {option.emoji}
            </span>
                        <div className="flex items-center justify-center flex-col gap-[4px]">
              <span className="w-[270px] text-[18px] font-semibold">
                {option.title}
              </span>
                            <span className="w-[268px] text-[14px] font-light">
                {option.description}
              </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}

export default MeetGoal;
