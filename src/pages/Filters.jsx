import React, { useState } from "react";
import {Button} from "../components/Button";
import { useNavigate } from "react-router-dom";

import DoubleRangeSlider from "../components/ui/DoubleRangeSlider";

function Filters() {
    const [selectedTargetGender, setSelectedTargetGender] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [dayLimit, setDayLimit] = useState(true);
    const navigate = useNavigate();

    const addInterest = (optionId) => {
        setSelectedInterests((prev) => prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]);
    }

    const targetGenders = [
        { id: "male", label: "Мужчина", emoji: "👱🏻‍♂️" },
        { id: "female", label: "Женщина", emoji: "👱🏻‍♀️" },
        { id: "all", label: "Всех", emoji: "💕" },
    ];

    const interests = [
        { id: "Harry Potter", title: "Harry Potter" },
        { id: "Дети 90-x", title: "Дети 90-x" },
        { id: "Хеви-метал", title: "Хеви-метал" },
        { id: "Вечеринки дома", title: "Вечеринки дома" },
        { id: "Джин с тоником", title: "Джин с тоником" },
    ];

    const options = [
        {
            id: 1,
            title: "Флирт и свидания",
            description: "Ходить на свидания и хорошо проводить время",
            emoji: "🔥",
        },
        {
            id: 2,
            title: "Серьеёзные отношения",
            description: "Найти вторую половинку и создать счастливые отношения",
            emoji: "💍",
        },
        {
            id: 3,
            title: "Дружеское общение",
            description:
                "Найти друзей и знакомых, общаться и договариватся о встречах",
            emoji: "✌️",
        },
        {
            id: 4,
            title: "Обовсём и ни о чём",
            description: "Общаться, делиться мыслями и идями без ограничений",
            emoji: "🥂",
        },
    ];

    return (
        <div className="w-[100%] h-[auto] pt-[70px] flex justify-center">

        <div className="h-[auto] flex flex-col justify-start items-start w-[343px]">

            <div className="w-full flex justify-between items-center">
                <div onClick={() => navigate("/Meet")}>
                    <img src="/icons/Button-back.svg" className="mt-3 w-[44px] h-[44px]"/>
                </div>
                <div>
                    <p className="text-white mt-3">Сбросить</p>
                </div>
            </div>

            <h1 className="font-raleway font-semibold mt-6 text-white text-[26px]">
                Фильтры
            </h1>
            <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
                Кого показывать
            </h1>
            <div className="flex justify-start flex-wrap items-center gap-[16px] mt-[16px]">
                {targetGenders.map((gender) => (
                    <div
                        key={gender.id}
                        onClick={() => setSelectedTargetGender(gender.id)}
                        className={`w-[145px] h-[48px] rounded-[400px] flex justify-center items-center text-[18px] text-white gap-[8px] cursor-pointer transition-all 
            ${
                            selectedTargetGender === gender.id
                                ? "bg-[#043939] border-[1.5px] border-[#a1f69e]"
                                : "bg-[#022424] border border-transparent"
                        }`}
                    >
                        <span className="text-[24px]">{gender.emoji}</span>
                        <span>{gender.label}</span>
                    </div>
                ))}
            </div>


            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
                    Возраст:
                </h1>
                <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
                    18-80 лет
                </h1>
            </div>

            <div className="relative w-full">
                <DoubleRangeSlider
                    min={18}
                    max={80}
                    onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                />
            </div>

            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
                    Расстояние:
                </h1>
                <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
                    0-100+км
                </h1>
            </div>

            <div className="relative w-full">
                <DoubleRangeSlider
                    min={0}
                    max={100}
                    onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                />
            </div>



            <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
                Населенный пункт:
            </h1>
            <input
                type="text"
                placeholder="Введите название"
                className="w-[343px] h-[64px] rounded-[8px] bg-[#022424] mt-4 pl-4 border border-[#233636] text-white outline-none focus:border-[#a1f69e]"
            />



            <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
                Статус:
            </h1>
            <div className="grid gric-cols-1 justify-start flex-wrap items-center gap-[16px] mt-[16px]">
                {options.map((option) => (
                    <div
                        key={option.id}
                        onClick={() => setSelectedOption(option.id)}
                        className={`w-[auto] p-3 h-[48px] rounded-[400px] flex items-center  text-white cursor-pointer transition-all 
                        ${
                            selectedOption === option.id
                                ? "bg-[#043939] border-[1.5px] border-[#a1f69e]"
                                : "bg-[#022424] border-[1px] border-[#233636]"
                        }`}
                    >
                        <span className="flex items-center justify-center text-[24px] w-[30px] ml-1 mr-1.5 text-center">
                          {option.emoji}
                        </span>
                        <span className={`w-[auto] text-[18px] font-normal`}>
                          {option.title}
                        </span>

                    </div>
                ))}
            </div>


            <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
                Интересы:
            </h1>
            <div className="flex flex-wrap  gap-[16px] mt-[16px]">
                {interests.map((option) => (
                    <div
                        key={option.id}
                        onClick={() => addInterest(option.id)}
                        className={`w-[auto] p-3 h-[48px] rounded-[400px] flex justify-center items-center text-[18px] font-light text-white gap-[8px] cursor-pointer transition-all 
            ${ selectedInterests.includes(option.id)
                            ? "bg-[#043939] border-[1.5px] border-[#a1f69e]"
                            : "bg-[#022424] border-[1px] border-[#233636]"
                        }`}
                    >
                        <span>{option.title}</span>
                    </div>
                ))}
            </div>



            <Button
                className={"mt-[37px] mb-6"}
            >
                Далее
            </Button>

        </div>
        </div>
    );
}

export default Filters;
