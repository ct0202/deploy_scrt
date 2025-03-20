import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {INTEREST} from "../../constants/interests";

function Interests() {
    const navigate = useNavigate();

    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem("step4Data");
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                setSelectedOptions(Array.isArray(parsedData) ? parsedData : []);
            } catch (error) {
                console.error("Ошибка парсинга step4Data:", error);
                setSelectedOptions([]); // Если данные повреждены, сбрасываем
            }
        }
    }, []);

    const addOption = (optionId) => {
        setSelectedOptions((prev) =>
            prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]
        );
    };

    const saveDataAndNext = () => {
        if (selectedOptions.length >= 5) {
            localStorage.setItem("step4Data", JSON.stringify(selectedOptions));
            navigate("/meet");
        } else {
            alert("Выберите минимум 5 интересов!");
        }
    };

    const options = INTEREST;

    return (
        <div className="w-[100vw] flex items-center justify-center flex-col">
            <div className='mt-[80px] mb-[30px] w-full pr-[16px] pl-[16px] flex-row text-[18px] flex justify-between'>
                <span className='text-white' onClick={() => {navigate(-1)}}>Отмена</span>
                <span className='text-[#A1F69E]' onClick={() => {navigate(-1)}}>Сохранить</span>
            </div>
        <div className="flex flex-col items-center w-[343px] h-[100%] overflow-x-hidden">
            <h1 className="font-raleway font-semibold mt-6 text-white text-[20px]">
                Добавьте ваши интересы
            </h1>
            <h1 className="font-raleway font-light mt-2 text-white text-center text-[16px]">
                Выберите не менее 5 интересов, чтобы поделиться ими с другими пользователями
            </h1>
            <div className="flex flex-wrap gap-[8px] mt-[16px]">
                {options.map((option) => (
                    <div
                        key={option.id}
                        onClick={() => addOption(option.id)}
                        className={`w-auto p-3 h-[48px] rounded-[400px] flex justify-center items-center text-[18px] font-light text-white gap-[4   px] cursor-pointer transition-all
              ${
                            selectedOptions.includes(option.id)
                                ? "bg-[#043939] border-[1.5px] border-[#a1f69e]"
                                : "bg-[#022424] border-[1px] border-[#233636]"
                        }`}
                    >
                        <span>{option.title}</span>
                    </div>
                ))}
            </div>

        </div>
        </div>
    );
}

export default Interests;
