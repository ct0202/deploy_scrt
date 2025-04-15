import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { updateRegistrationData } from '../../store/userSlice';
import axios from '../../axios';

function MeetGoal() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.userId);
    const registrationData = useSelector((state) => state.user.registrationData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const options = [
        {
            title: "Флирт и свидания",
            description: "Ходить на свидания и хорошо проводить время",
            emoji: "🔥",
        },
        {
            title: "Серьёзные отношения",
            description: "Найти вторую половинку и создать счастливые отношения",
            emoji: "💍",
        },
        {
            title: "Дружеское общение",
            description: "Найти друзей и знакомых, общаться и договариваться о встречах",
            emoji: "✌️",
        },
        {
            title: "Обо всём и ни о чём",
            description: "Общаться, делиться мыслями и идеями без ограничений",
            emoji: "🥂",
        },
    ];

    const handlePurposeSelect = (purpose) => {
        dispatch(updateRegistrationData({ field: 'purpose', value: purpose }));
    };

    const handleSave = async () => {
        if (!registrationData.purpose) {
            alert('Пожалуйста, выберите цель знакомства');
            return;
        }

        try {
            setIsSubmitting(true);
            console.log('Sending meet goal update request...');
            const response = await axios.put('/users/updateMeetGoal', {
                telegramId: userId,
                purpose: registrationData.purpose
            });

            console.log('Meet goal update response:', response.data);
            navigate(-1);
        } catch (error) {
            console.error('Error updating meet goal:', error);
            alert('Произошла ошибка при сохранении цели знакомства. Пожалуйста, попробуйте еще раз.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-[100vw] mt-[90px] flex items-center justify-center flex-col">
            <div className='mt-[80px] mb-[30px] w-full pr-[16px] pl-[16px] flex-row text-[18px] flex justify-between'>
                <span className='text-white' onClick={() => {navigate(-1)}}>Отмена</span>
                <span 
                    className={`${isSubmitting ? 'opacity-50' : 'text-[#A1F69E]'}`} 
                    onClick={isSubmitting ? undefined : handleSave}
                >
                    {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                </span>
            </div>
            <div className="flex flex-col justify-start items-start w-[343px] mb-[200px]">
                <h1 className="font-raleway font-semibold mt-6 text-white text-[20px]">
                    Цель знакомства
                </h1>
                <h2 className="font-raleway font-light mt-2 text-white text-[16px]">
                    Можно изменить в любой момент
                </h2>
                <div className="grid grid-cols-1 justify-start flex-wrap items-center gap-[16px] mt-[16px]">
                    {options.map((option) => (
                        <div
                            key={option.title}
                            onClick={() => handlePurposeSelect(option.title)}
                            className={`w-[343px] h-[89px] rounded-[8px] flex text-white cursor-pointer transition-all 
                                ${registrationData.purpose === option.title
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
