import React, {useCallback, useState} from "react";
import {Button} from "../components/Button";
import { useNavigate } from "react-router-dom";

import DoubleRangeSlider from "../components/ui/DoubleRangeSlider";
import {INTEREST} from "../constants/interests";

function Filters() {
    const [selectedTargetGender, setSelectedTargetGender] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [resetCounter, setResetCounter] = useState(0);

    const navigate = useNavigate();

    const [rangeAge, setRangeAge] = useState({ min: 18, max: 80 });
    const [rangeDist, setRangeDist] = useState({ min: 0, max: 100 });

    const addInterest = (optionId) => {
        setSelectedInterests((prev) => prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]);
    }

    const handleAgeChange = useCallback(({ min, max }) => {
        setRangeAge((prev) => (prev.min !== min || prev.max !== max ? { min, max } : prev));
    }, []);

    const handleDistChange = useCallback(({ min, max }) => {
        setRangeDist((prev) => (prev.min !== min || prev.max !== max ? { min, max } : prev));
    }, []);


    const handleClear = () => {
        console.log("handleClear");
        setSelectedInterests([]);
        setSelectedTargetGender(null);
        setSelectedOption(null);
        handleDistChange({ min: 0, max: 100 }); // Используем новый обработчик
        handleAgeChange({ min: 18, max: 80 });
        setResetCounter((prev) => prev + 1); // Увеличиваем значение для триггера

    }

    const targetGenders = [
        { id: "male", label: "Мужчина", emoji: "👱🏻‍♂️" },
        { id: "female", label: "Женщина", emoji: "👱🏻‍♀️" },
        { id: "all", label: "Всех", emoji: "💕" },
    ];

    const interests = INTEREST;

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
        <div className="w-[100%] h-[auto] pt-[100px] flex justify-center">

        <div className="h-[auto] flex flex-col justify-start items-start w-[343px]">

            <div className="w-full flex justify-between items-center z-10">
                <div onClick={() => (window.location.href = "/meet")}>
                    <img src="/icons/Button-back.svg" className="mt-3 w-[44px] h-[44px]"/>
                </div>
                <div onClick={handleClear}>
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
                    {rangeAge.min}-{rangeAge.max} лет
                </h1>
            </div>

            <div className="relative w-full">
                <DoubleRangeSlider
                    min={18}
                    max={80}
                    onChange={handleAgeChange}
                    resetTrigger={resetCounter}
                />
            </div>

            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
                    Расстояние:
                </h1>
                <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
                    {rangeDist.min}-{rangeDist.max}{rangeDist.max === 100 ? '+' : '' }км
                </h1>
            </div>

            <div className="relative w-full">
                <DoubleRangeSlider
                    min={0}
                    max={100}
                    onChange={handleDistChange}
                    resetTrigger={resetCounter}
                />
            </div>


            <div className="flex flex-row justify-between items-center w-full">
            <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
                Населенный пункт:
            </h1>
            <img src="/icons/premium.svg" className="mt-[32px] w-[121px]"/>
            </div>

            <input
                type="text"
                placeholder="Введите название"
                disabled={true}
                className="w-[343px] h-[64px] rounded-[8px] bg-[#022424] mt-4 pl-4 border border-[#233636] opacity-40 text-white outline-none focus:border-[#a1f69e]"
            />



            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
                    Статус:
                </h1>
                <img src="/icons/premium.svg" className="mt-[32px] w-[121px]"/>
            </div>

            <div className="grid gric-cols-1 justify-start flex-wrap items-center gap-[16px] mt-[16px] opacity-40">
                {options.map((option) => (
                    <div
                        key={option.id}
                        onClick={() => setSelectedOption(option.id)}
                        className={`w-[auto] p-3 h-[48px] rounded-[400px] flex items-center  text-[#FFFFFF] cursor-pointer transition-all 
                        ${
                            // selectedOption === option.id
                            selectedOption === 1000
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
            <div className="flex flex-wrap  gap-[16px] mt-[16px] pb-[200px]">
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
                        <span>{option.id}</span>
                    </div>
                ))}
            </div>


            <div className="fixed bottom-4">
                <Button
                >
                    Применить
                </Button>
            </div>

        </div>
        </div>
    );
}

export default Filters;
