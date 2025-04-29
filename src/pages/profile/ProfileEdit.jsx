import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/SwiperCustomPagination.css";
import { axiosPrivate } from "../../axios";
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../store/userSlice';
import { useUserId } from '../../hooks/useUserId';

function ProfileEdit() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.userData);
    const [loading, setLoading] = useState(true);
    const userId = useUserId();

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) return;
            try {
                const response = await axiosPrivate.get(`/users/${userId}`);
                dispatch(setUserData(response.data));
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [dispatch, userId]);

    // Функция для вычисления возраста
    const calculateAge = (birthDate) => {
        if (!birthDate) return '';
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    };

    // Функция для отображения цели знакомства
    const getPurposeText = (purpose) => {
        switch(purpose) {
            case "Флирт и свидания":
                return "Флирт и свидания";
            case "Серьёзные отношения":
                return "Серьёзные отношения";
            case "Дружеское общение":
                return "Дружеское общение";
            case "Обо всём и ни о чём":
                return "Обо всём и ни о чём";
            default:
                return "Не указано";
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="relative h-[100%]">
                <div className="w-[100%] pt-[100px] pb-[80px] flex flex-col !items-center">
                    <div className="z-0 w-full flex justify-center items-center flex-col">
                        <div className="w-[343px] flex flex-row ">
                            <img
                                src="/icons/Button-back.svg"
                                alt="Назад"
                                onClick={() => {navigate(-1)}}
                                className="mt-3 w-[44px] h-[44px]"
                            />
                        </div>
                        <div></div>
                        <div className="w-[100%] flex justify-center align-center mt-4">
                            <div className="relative w-[343px] rounded-[16px]">
                                <div className="w-full relative">
                                    <div
                                        className="custom-pagination"
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            zIndex: 10,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                        }}
                                    ></div>
                                </div>
                                <Swiper
                                    modules={[Pagination]}
                                    spaceBetween={0}
                                    slidesPerView={1}
                                    className="h-[560px]"
                                    pagination={{
                                        el: '.custom-pagination'
                                    }}
                                >
                                    {userData.photos.map((photo, index) => (
                                        photo && (
                                            <SwiperSlide key={index}>
                                                <img
                                                    src={photo}
                                                    alt={`Фотография ${index + 1}`}
                                                    className="z-[1] w-[363px] h-[544px] rounded-[16px] object-cover"
                                                />
                                            </SwiperSlide>
                                        )
                                    ))}
                                </Swiper>

                                <img src='/icons/redactirovat_photo.svg' alt="Редактировать фото" className='absolute z-[10] left-[30px] top-[500px]' onClick={()=>navigate(config.ROUTES.PROFILE.PHOTO)}/>
                                <img src='/icons/izmenit.svg' alt="Изменить" className='absolute z-[10] top-[565px] left-[230px]' onClick={()=>navigate(config.ROUTES.PROFILE.MAIN)} />
                                <img src='/icons/izmenit.svg' alt="Изменить" className='absolute z-[10] top-[607px] left-[180px]' onClick={()=>navigate(config.ROUTES.PROFILE.MAIN)}/>
                                <img src='/icons/izmenit.svg' alt="Изменить" className='absolute z-[10] top-[680px] left-[200px]' onClick={()=>navigate(config.ROUTES.PROFILE.MEET_GOAL)} />
                                <img src='/icons/izmenit.svg' alt="Изменить" className='absolute z-[10] top-[765px] left-[180px]' onClick={()=>navigate(config.ROUTES.PROFILE.AUDIO)}/>
                                <img src='/icons/izmenit.svg' alt="Изменить" className='absolute z-[10] top-[890px] left-[130px]' onClick={()=>navigate(config.ROUTES.PROFILE.INTERESTS)}/>
                                <div className="shadow-[0_-25px_30px_rgba(0,0,0,0.9)] rounded-[16px] rounded-t-none relative z-[5] flex flex-col pl-[24px] pr-[24px] bg-[#010D0D] translate-y-[-27px] drop-shadow-[0_0_30px_0_rgb(0,0,0)]">
                                    <h1 className="font-raleway font-bold mt-6 text-white text-[26px]">
                                        {userData.name}, {calculateAge(userData.birthDay)} лет
                                    </h1>
                                    <h1 className="font-raleway font-light mt-2 text-white text-[18px]">
                                        {userData.city}, {userData.country}
                                    </h1>
                                    <div className="border-b-2 border-white/30 pt-5" />
                                    <h1 className="font-raleway font-bold mt-6 text-white text-[18px]">
                                        Цель знакомства
                                    </h1>
                                    <h1 className="font-raleway font-light mt-2 text-white text-[18px]">
                                        {getPurposeText(userData.purpose)}
                                    </h1>
                                    <h1 className="font-raleway font-bold mt-6 text-white text-[18px]">
                                        Аудио визитка
                                    </h1>
                                    {userData.audioMessage ? (
                                        <img
                                            src="/icons/user_voice_message.svg"
                                            alt="Аудио визитка"
                                            className="w-[295px] h-[64px] mt-2"
                                        />
                                    ) : (
                                        <div className="w-[295px] h-[64px] mt-2 bg-[#FFFFFF1A] rounded-[8px] flex items-center justify-center">
                                            <span className="text-white opacity-50">Нет аудио визитки</span>
                                        </div>
                                    )}
                                    <h1 className="font-raleway font-bold mt-6 text-white text-[18px]">
                                        Интересы
                                    </h1>
                                    <h1 className="font-raleway font-light mt-2 text-white text-[18px]">
                                        {userData.interests.join(", ")}
                                    </h1>
                                    <h1 className="font-raleway font-bold mt-6 text-white text-[18px]">
                                        Подарки
                                    </h1>
                                    <div>
                                        <Swiper
                                            modules={[]}
                                            spaceBetween={10}
                                            slidesPerView={2}
                                            className="h-[170px]"
                                        >
                                            <SwiperSlide className="w-[130px] !h-[130px] rounded-[16px] mt-2 !flex justify-center items-center bg-[#FFFFFF1A]">
                                                <img
                                                    src="/icons/present.svg"
                                                    alt="Подарок"
                                                    className="w-[80px] h-[80px]"
                                                />
                                            </SwiperSlide>
                                            <SwiperSlide className="w-[130px] !h-[130px] rounded-[16px] mt-2 !flex justify-center items-center bg-[#FFFFFF1A]">
                                                <img
                                                    alt="Подарок"
                                                    src="/icons/present.svg"
                                                    className="w-[80px] h-[80px]"
                                                />
                                            </SwiperSlide>
                                            <SwiperSlide className="w-[130px] !h-[130px] rounded-[16px] mt-2 !flex justify-center items-center bg-[#FFFFFF1A]">
                                                <img
                                                    alt="Подарок"
                                                    src="/icons/present.svg"
                                                    className="w-[80px] h-[80px]"
                                                />
                                            </SwiperSlide>
                                            <SwiperSlide className="w-[130px] !h-[130px] rounded-[16px] mt-2 !flex justify-center items-center bg-[#FFFFFF1A]">
                                                <img
                                                    alt="Подарок"
                                                    src="/icons/present.svg"
                                                    className="w-[80px] h-[80px]"
                                                />
                                            </SwiperSlide>
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileEdit;
