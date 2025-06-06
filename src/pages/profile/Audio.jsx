import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import VoiceProgress from '../../components/ui/VoiceProgress';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function Audio() {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const telegramId = useSelector((state) => state.auth.telegramId);
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    

    const handleSave = async () => {
        if (!audioBlob) return;

        try {
            setIsSubmitting(true);
            const formData = new FormData();

            formData.append('telegramId', telegramId);
            formData.append('audioMessageFile', audioBlob);

            const bars = Array(46).fill(7); // fallback

            try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const arrayBuffer = await audioBlob.arrayBuffer(); // use async/await instead of FileReader

            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            const rawData = audioBuffer.getChannelData(0);
            const samples = 46;
            const blockSize = Math.floor(rawData.length / samples);
            const heights = [];

            for (let i = 0; i < samples; i++) {
                let sum = 0;
                for (let j = 0; j < blockSize; j++) {
                sum += Math.abs(rawData[i * blockSize + j]);
                }
                const average = sum / blockSize;
                heights.push(Math.max(7, average * 300));
            }

            formData.append('audioMessageBars', JSON.stringify(heights));
            } catch (audioError) {
            console.error("Error processing audio, using fallback bars:", audioError);
            formData.append('audioMessageBars', JSON.stringify(bars));
            }

            console.log('Sending audio update request...');
            const response = await axiosPrivate.put('/users/updateAudio', formData, {
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
