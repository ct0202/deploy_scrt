import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { axiosPrivate } from '../../axios';

function Photo() {
    const navigate = useNavigate();
    const userId = useSelector((state) => state.user.userId);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [photos, setPhotos] = useState({});
    const fileInputs = useRef({});

    const handlePhotoSelect = (photoId) => {
        fileInputs.current[photoId]?.click();
    };

    const handleFileChange = (e, photoId) => {
        const file = e.target.files[0];
        if (file) {
            setPhotos(prev => ({
                ...prev,
                [photoId]: file
            }));
        }
    };

    const handleSave = async () => {
        if (Object.keys(photos).length === 0) return;

        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append('telegramId', userId);

            Object.entries(photos).forEach(([photoId, file]) => {
                formData.append(`photo${photoId}`, file);
            });

            console.log('Sending photos update request...');
            const response = await axiosPrivate.put('/users/updatePhotos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Photos update response:', response.data);
            navigate(-1);
        } catch (error) {
            console.error('Error updating photos:', error);
            alert('Произошла ошибка при сохранении фотографий. Пожалуйста, попробуйте еще раз.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-[100vw] flex items-center justify-center">
            <div className="flex flex-col items-center w-[343px] h-screen overflow-y-auto overflow-x-hidden">
                <div className='mt-[80px] mb-[30px] w-full flex-row text-[18px] flex justify-between'>
                    <span className='text-white' onClick={() => {navigate(-1)}}>Отмена</span>
                    <span 
                        className={`${isSubmitting ? 'opacity-50' : 'text-[#A1F69E]'}`} 
                        onClick={isSubmitting ? undefined : handleSave}
                    >
                        {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                    </span>
                </div>
                <h1 className="font-raleway font-semibold mt-6 text-white text-[20px]">
                    Добавьте фото
                </h1>
                <h1 className="font-raleway font-light mt-2 text-white text-[16px]">
                    Минимум одно, а лучше – все четыре
                </h1>
                <div className={`w-[343] h-[343] mb-[30px] mt-5 grid grid-cols-2 gap-[15px]`}>
                    {[1, 2, 3, 4].map((photoId) => (
                        <React.Fragment key={photoId}>
                            <input
                                type="file"
                                ref={el => fileInputs.current[photoId] = el}
                                onChange={(e) => handleFileChange(e, photoId)}
                                accept="image/*"
                                className="hidden"
                            />
                            <div
                                id={`photo${photoId}`}
                                onClick={() => handlePhotoSelect(photoId)}
                                className={`w-[164px] h-[164px] border-[1px] rounded-[16px] border-[#233636] bg-[#022424] relative flex items-center justify-center cursor-pointer`}
                            >
                                {photoId === 1 && (
                                    <img
                                        alt="Главное фото"
                                        src="/icons/main_photo_label.svg"
                                        className="absolute top-0 left-0"
                                    />
                                )}
                                {photos[photoId] ? (
                                    <img
                                        src={URL.createObjectURL(photos[photoId])}
                                        alt={`Photo ${photoId}`}
                                        className="w-full h-full object-cover rounded-[16px]"
                                    />
                                ) : (
                                    <img alt="Камера" src="/icons/camera.svg" />
                                )}
                                {photoId !== 1 && (
                                    <span className="absolute top-1 right-1 text-white font-raleway text-[15px] font-medium">
                                        +25 <img alt="myta-coin" src="/icons/myta-coin.svg" className="inline w-[16px]"/>
                                    </span>
                                )}
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                <h1 className="font-raleway font-light text-white text-[16px]">
                    Перетащите, чтобы изменить порядок
                </h1>
            </div>
        </div>
    );
}

export default Photo;
