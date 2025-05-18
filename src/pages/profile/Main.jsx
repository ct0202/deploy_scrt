import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { updateRegistrationData } from '../../store/userSlice';

import LocationSelect from '../../components/LocationSelect';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function Main() {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.userId);
    const userData = useSelector((state) => state.user.userData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        gender: null,
        targetGender: null,
        birthDate: "",
        country: "",
        city: "",
        latitude: null,
        longitude: null
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
        if (userData) {
            // Format the birthDay date to yyyy-MM-dd
            const formattedBirthDay = userData.birthDay ? new Date(userData.birthDay).toISOString().split('T')[0] : "";

        setFormData({
                name: userData.name || "",
                gender: userData.gender || null,
                targetGender: userData.wantToFind || null,
                birthDate: formattedBirthDay,
                country: userData.country || "",
                city: userData.city || "",
                latitude: userData.coordinates?.latitude || null,
                longitude: userData.coordinates?.longitude || null
        });
        }
    }, [userData]);

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
            city: locationData.city,
            latitude: locationData.coordinates.latitude,
            longitude: locationData.coordinates.longitude
        }));
    };

    const handleSave = async () => {
        try {
            setIsSubmitting(true);
            
            const requestData = {
                telegramId: userId,
                name: formData.name,
                gender: formData.gender,
                wantToFind: formData.targetGender,
                birthDay: formData.birthDate, // This will be in yyyy-MM-dd format
                country: formData.country,
                city: formData.city,
                latitude: formData.latitude,
                longitude: formData.longitude
            };

            const response = await axiosPrivate.put('/users/mainInfoUpdate', requestData);

            if (response.data) {
                dispatch(updateRegistrationData({
                    name: formData.name,
                    gender: formData.gender,
                    wantToFind: formData.targetGender,
                    birthDay: formData.birthDate,
                    country: formData.country,
                    city: formData.city,
                    coordinates: {
                        latitude: formData.latitude,
                        longitude: formData.longitude
                    }
                }));

                navigate(-1);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
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
