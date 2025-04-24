import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { INTEREST } from "../../constants/interests";
import axios from '../../axios';

function Interests() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.userId);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const storedData = localStorage.getItem("step4Data");
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                setSelectedOptions(Array.isArray(parsedData) ? parsedData : []);
            } catch (error) {
                console.error("Ошибка парсинга step4Data:", error);
                setSelectedOptions([]);
            }
        }
    }, []);

    const addOption = (optionId) => {
        setSelectedOptions((prev) =>
            prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]
        );
    };

    const handleSave = async () => {
        if (selectedOptions.length < 5) {
            alert('Пожалуйста, выберите не менее 5 интересов');
            return;
        }

        try {
            setIsSubmitting(true);
            console.log('Sending interests update request...');
            const response = await axios.put('/users/updateInterests', {
                telegramId: userId,
                interests: selectedOptions
            });

            console.log('Interests update response:', response.data);
            localStorage.setItem("step4Data", JSON.stringify(selectedOptions));
            navigate(-1);
        } catch (error) {
            console.error('Error updating interests:', error);
            alert('Произошла ошибка при сохранении интересов. Пожалуйста, попробуйте еще раз.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-[100vw] flex items-center justify-center flex-col">
            <div className='mt-[80px] mb-[30px] w-full pr-[16px] pl-[16px] flex-row text-[18px] flex justify-between'>
                <span className='text-white' onClick={() => {navigate(-1)}}>Отмена</span>
                <span 
                    className={`${isSubmitting ? 'opacity-50' : 'text-[#A1F69E]'}`} 
                    onClick={isSubmitting ? undefined : handleSave}
                >
                    {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                </span>
            </div>
            <div className="flex flex-col items-center w-[343px] h-[100%] overflow-x-hidden">
                <h1 className="font-raleway font-semibold mt-6 text-white text-[20px]">
                    Добавьте ваши интересы
                </h1>
                <h1 className="font-raleway font-light mt-2 text-white text-center text-[16px]">
                    Выберите не менее 5 интересов, чтобы поделиться ими с другими пользователями
                </h1>
                <div className="flex flex-wrap gap-[8px] mt-[16px]">
                    {INTEREST.map((option) => (
                        <div
                            key={option.id}
                            onClick={() => addOption(option.id)}
                            className={`w-auto ${ option.id === "Права людей с ограниченными возможностями" ? "text-[15px] p-2" :"p-3 text-[18px]"} h-[48px] rounded-[400px] flex justify-center items-center font-light text-white cursor-pointer transition-all
                            ${selectedOptions.includes(option.id)
                                ? "bg-[#043939] border-[1.5px] border-[#a1f69e]"
                                : "bg-[#022424] border-[1px] border-[#233636]"
                            }`}
                        >
                            <span>{option.id}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Interests;
