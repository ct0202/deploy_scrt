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
        { id: "male", label: "Мужчины", emoji: "👱🏻‍♂️" },
        { id: "female", label: "Женщины", emoji: "👱🏻‍♀️" },
    ];

    const interests = [
        { id: "Популярности", title: "Популярности" },
    ];

    return (
        <div className="w-[100%] h-[auto] pt-[70px] flex justify-center">

            <div className="h-[auto] flex flex-col justify-start items-start w-[343px]">

                <div className="w-full flex justify-between items-center">
                    <div onClick={() => navigate("/Streams")}>
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
                    Чьи прямые трансляции вас интересуют:
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


                <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
                    Отсортировать по:
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
                    className={"mt-[300px] mb-6"}
                >
                    Применить
                </Button>

            </div>
        </div>
    );
}

export default Filters;
