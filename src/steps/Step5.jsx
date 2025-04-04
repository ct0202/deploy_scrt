import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addInterest, removeInterest } from '../store/userSlice';
import { INTEREST } from "../constants/interests";
import axios from '../axios';

function Step5({ setStep }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const registrationData = useSelector((state) => state.user.registrationData);
    const interests = useSelector((state) => state.user.registrationData.interests);
    const userId = useSelector((state) => state.user.userId);
    const [disabled, setDisabled] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    console.log("step4");

    useEffect(() => {
        if (interests.length >= 5) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [interests]);

    const addOption = (optionId) => {
        if (interests.includes(optionId)) {
            dispatch(removeInterest(optionId));
        } else {
            dispatch(addInterest(optionId));
        }
    };

    const convertBase64ToBlob = async (base64Data) => {
        const response = await fetch(base64Data);
        return await response.blob();
    };

    const saveDataAndNext = async () => {
        if (interests.length >= 5) {
            try {
                setIsSubmitting(true);
                
                // Create FormData object
                const formData = new FormData();
                
                // Add basic user information
                formData.append('name', registrationData.name);
                formData.append('gender', registrationData.gender);
                formData.append('wantToFind', registrationData.wantToFind);
                formData.append('birthDay', registrationData.birthDay);
                formData.append('country', registrationData.country);
                formData.append('city', registrationData.city);
                formData.append('purpose', registrationData.purpose);
                
                // Add telegramId from Redux store
                formData.append('telegramId', userId);
                
                // Add interests as JSON string
                formData.append('interests', JSON.stringify(registrationData.interests));

                // Add photos
                for (let i = 0; i < registrationData.photos.length; i++) {
                    const photo = registrationData.photos[i];
                    if (photo) {
                        const photoBlob = await convertBase64ToBlob(photo);
                        formData.append(`photo${i + 1}`, photoBlob);
                    }
                }

                // Add audio message if exists
                if (registrationData.audioMessage) {
                    const audioBlob = await convertBase64ToBlob(registrationData.audioMessage);
                    formData.append('audioMessage', audioBlob);
                }

                // Submit the form data
                const response = await axios.post('/users/register', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.data) {
                    // Store the token if returned
                    if (response.data.token) {
                        localStorage.setItem('token', response.data.token);
                    }
                    navigate("/meet");
                }
            } catch (error) {
                console.error('Registration error:', error);
                alert('Произошла ошибка при регистрации. Пожалуйста, попробуйте еще раз.');
            } finally {
                setIsSubmitting(false);
            }
        } else {
            alert("Выберите минимум 5 интересов!");
        }
    };

    const options = INTEREST;

    return (
        <div className="flex flex-col items-center w-[343px] h-[100%] overflow-x-hidden">
            <h1 className="font-raleway font-semibold mt-6 text-white text-[20px]">
                Добавьте ваши интересы
            </h1>
            <h1 className="font-raleway font-light mt-2 text-white text-center text-[16px]">
                Выберите не менее 5 интересов, чтобы поделиться ими с другими пользователями
            </h1>
            <div className="flex flex-wrap gap-[8px] mt-[16px] mb-[100px]">
                {options.map((option) => (
                    <div
                        key={option.id}
                        onClick={() => addOption(option.id)}
                        className={`w-auto ${ option.id === "Права людей с ограниченными возможностями" ? "text-[15px] p-2" :"p-3 text-[18px]"} h-[48px] rounded-[400px] flex justify-center items-center font-light text-white cursor-pointer transition-all
              ${
                            interests.includes(option.id)
                                ? "bg-[#043939] border-[1.5px] border-[#a1f69e]"
                                : "bg-[#022424] border-[1px] border-[#233636]"
                        }`}
                    >
                        <span>{option.id}</span>
                    </div>
                ))}
            </div>
            <div className="fixed bottom-[20px]">
                <Button 
                    onclick={saveDataAndNext} 
                    disabled={disabled || isSubmitting}
                >
                    {isSubmitting ? 'Отправка...' : 'Начать знакомства'}
                </Button>
            </div>
        </div>
    );
}

export default Step5;
