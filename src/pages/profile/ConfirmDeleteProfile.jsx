import {useNavigate} from "react-router-dom";
import React, {useRef, useState} from "react";

function ConfirmDeleteProfile() {
    const navigate = useNavigate();

    const [checked, setChecked] = useState([]);

    const handleCheck = (id) => {
        setChecked((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const options = [
        { id: 1, label: "Не могу найти подходящего человека" },
        { id: 2, label: "Уже нашёл(ла), что искал(а)" },
        { id: 3, label: "Хочу взять паузу" },
        { id: 4, label: "Непонятно как пользоваться приложением" },
        { id: 5, label: "Слишком много рекламы" },
        { id: 6, label: "Перехожу в другое приложение" },
        { id: 7, label: "Другое" },
    ];

    return (
        <div className='w-[100vw] h-[100%] flex flex-col items-center justify-start font-raleway overflow-scroll'>
            <div className='flex items-center justify-center relative text-white text-[24px] w-full
            border-b border-[#233636] relative pb-[10px] pt-[90px]'>
                <img src='/icons/Button-back.svg' onClick={() => {navigate(-1)}} className='absolute top-[105px] left-[16px] w-[44px] h-[44px]'/>
                <p className='mt-5'>Удаление аккаунта</p>
            </div>
            <div className='w-[343px] text-[20px] text-white'>
                <p className='pt-[10px] pb-[15px]'>Укажите, пожалуйста, почему вы решили перестать пользоваться нашим приложением?</p>
                {options.map((option) => (
                    <label key={option.id} className="flex items-center gap-[10px] pt-[5px] pb-[5px] cursor-pointer">
                        <input
                            type="checkbox"
                            checked={checked.includes(option.id)}
                            onChange={() => handleCheck(option.id)}
                            className="hidden"
                        />
                        <div
                            className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all
              ${checked.includes(option.id) ? "bg-[#A1F69E] border-[#A1F69E]" : "bg-white border-gray-500"}
            `}
                        >
                            {checked.includes(option.id) && (
                                <svg
                                    className="w-4 h-4 text-black font-bold font-raleway"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>
                        <span className="text-white text-[18px]">{option.label}</span>
                    </label>
                ))}
            </div>

            <div className='pt-[130px] pb-[30px] flex flex-col items-center justify-center'>
                <div className='bg-[#CE5D49] font-medium text-white rounded-[400px] h-[64px] w-[343px] flex items-center justify-center'>
                    Удалить аккаунт
                </div>
            </div>
        </div>
    );
}

export default ConfirmDeleteProfile;