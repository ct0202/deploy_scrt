import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios';
import VoiceProgress from '../../components/ui/VoiceProgress';

function Audio() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.userId);
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSave = async () => {
        if (!audioBlob) return;

        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append('telegramId', userId);
            formData.append('audioMessage', audioBlob);

            console.log('Sending audio update request...');
            const response = await axios.put('/users/updateAudio', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Audio update response:', response.data);
            navigate(-1);
        } catch (error) {
            console.error('Error updating audio:', error);
            alert('Произошла ошибка при сохранении аудио. Пожалуйста, попробуйте еще раз.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-[100vw] flex flex-col">
            <div className='mt-[90px] mb-[30px] pl-[16px] pr-[16px] w-full flex-row text-[18px] flex justify-between'>
                <span className='text-white' onClick={() => {navigate(-1)}}>Отмена</span>
                <span 
                    className={`${isSubmitting ? 'opacity-50' : 'text-[#A1F69E]'}`} 
                    onClick={isSubmitting ? undefined : handleSave}
                >
                    {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                </span>
            </div>
            <div className="flex ml-[16px] flex-col items-center w-[343px] h-[750px] overflow-y-auto overflow-x-hidden ">
                <h1 className="font-raleway font-semibold mt-6 text-white text-[20px]">
                    Аудио визитка (30 сек)
                </h1>
                <h1 className="font-raleway font-light mt-2 text-white text-center text-[16px]">
                    Расскажите немного о себе другим пользователям. При необходимости аудио
                    визитку можно будет перезаписать или удалить
                </h1>

                <img
                    src="/icons/Recorder.svg"
                    className="w-[220px] h-[220px] mt-10"
                    alt="recorder icon"
                />
                <VoiceProgress 
                    onRecordingComplete={(blob) => setAudioBlob(blob)}
                    isRecording={isRecording}
                    setIsRecording={setIsRecording}
                />

                <p className="font-raleway font-medium mt-4 text-white text-center text-[16px] pl-1">
                    НАЖМИТЕ И УДЕРЖИВАЙТЕ
                    <br /> ДЛЯ ЗАПИСИ
                </p>
            </div>
        </div>
    );
}

export default Audio;
