import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { updateRegistrationData } from '../../store/userSlice';
import { axiosPrivate } from '../../axios';

import LocationSelect from '../../components/LocationSelect';

function Main() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.userId);
    const registrationData = useSelector((state) => state.user.registrationData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        gender: null,
        targetGender: null,
        birthDate: "",
        country: "",
        city: "",
    });

    const genders = [
        { id: "male", label: "Мужчина", emoji: "👱🏻‍♂️" },
        { id: "female", label: "Женщина", emoji: "👱🏻‍♀️" }
    ];

    const targetGenders = [
        { id: "male", label: "Мужчин", emoji: "👱🏻‍♂️" },
        { id: "female", label: "Женщин", emoji: "👱🏻‍♀️" },
        { id: "all", label: "Всех", emoji: "💕" },
    ];

    useEffect(() => {
        localStorage.setItem("step1Data", JSON.stringify(formData));
    }, [formData]);

    useEffect(() => {
        // Инициализируем formData данными из Redux при монтировании
        setFormData({
            name: registrationData.name || "",
            gender: registrationData.gender || null,
            targetGender: registrationData.wantToFind || null,
            birthDate: registrationData.birthDay || "",
            country: registrationData.country || "",
            city: registrationData.city || "",
        });
    }, [registrationData]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLocationSelect = (locationData) => {
        setFormData(prev => ({
            ...prev,
            country: locationData.country,
            city: locationData.city
        }));
    };

    const handleSave = async () => {
        try {
            setIsSubmitting(true);
            
            // Prepare the request data
            const requestData = {
                telegramId: userId,
                name: formData.name,
                gender: formData.gender,
                wantToFind: formData.targetGender,
                birthDay: formData.birthDate,
                country: formData.country,
                city: formData.city
            };

            // Log the request data
            console.log('Sending update request with data:', requestData);

            // Send the request
            const response = await axiosPrivate.put('/users/mainInfoUpdate', requestData);
            
            // Log the response
            console.log('Update response:', response.data);

            if (response.data) {
                // Update Redux store with the new data
                dispatch(updateRegistrationData({ field: 'name', value: formData.name }));
                dispatch(updateRegistrationData({ field: 'gender', value: formData.gender }));
                dispatch(updateRegistrationData({ field: 'wantToFind', value: formData.targetGender }));
                dispatch(updateRegistrationData({ field: 'birthDay', value: formData.birthDate }));
                dispatch(updateRegistrationData({ field: 'country', value: formData.country }));
                dispatch(updateRegistrationData({ field: 'city', value: formData.city }));

                navigate(-1);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
            }
            alert('Произошла ошибка при сохранении данных. Пожалуйста, попробуйте еще раз.');
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
                    Как вас зовут?
                </h1>
                <input
                    type="text"
                    name="name"
                    placeholder="Ваше имя"
                    className="w-[343px] h-[64px] rounded-[8px] bg-[#022424] mt-4 pl-4 border border-[#233636] text-white outline-none focus:border-[#a1f69e]"
                    value={formData.name}
                    onChange={handleChange}
                />
                <h1 className="font-raleway font-semibold mt-[32px] text-white text-[20px]">
                    Ваш пол
                </h1>
                <div className="flex justify-start flex-wrap items-center gap-[16px] mt-[16px]">
                    {genders.map((gender) => (
                        <div
                            key={gender.id}
                            onClick={() =>
                                setFormData((prev) => ({...prev, gender: gender.id}))
                            }
                            className={`w-[145px] h-[48px] rounded-[400px] flex justify-center items-center text-[18px] text-white gap-[8px] cursor-pointer transition-all 
                ${
                                formData.gender === gender.id
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
                    Кого вам показывать?
                </h1>
                <div className="flex justify-start flex-wrap items-center gap-[16px] mt-[16px]">
                    {targetGenders.map((gender) => (
                        <div
                            key={gender.id}
                            onClick={() =>
                                setFormData((prev) => ({...prev, targetGender: gender.id}))
                            }
                            className={`w-[145px] h-[48px] rounded-[400px] flex justify-center items-center text-[18px] text-white gap-[8px] cursor-pointer transition-all 
                ${
                                formData.targetGender === gender.id
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
                    Ваша дата рождения?
                </h1>
                <input
                    type="date"
                    name="birthDate"
                    placeholder="Выбрать дату"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="w-[343px] h-[64px] rounded-[8px] bg-[#022424] mt-4 pl-4 border border-[#233636] appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 text-white outline-none focus:border-[#a1f69e]"
                />

                <LocationSelect onLocationSelect={handleLocationSelect} />
            </div>
        </div>
    );
}

export default Main;
