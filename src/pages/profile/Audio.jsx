import React from "react";

import {useNavigate} from "react-router-dom";

function Audio() {
    const navigate = useNavigate();

    return (
        <div className="w-[100vw] flex flex-col">
            <div className='mt-[90px] mb-[30px] pl-[16px] pr-[16px] w-full flex-row text-[18px] flex justify-between'>
                <span className='text-white' onClick={() => {navigate(-1)}}>Отмена</span>
                <span className='text-[#A1F69E]' onClick={() => {navigate(-1)}}>Сохранить</span>
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
                {/*<VoiceProgress />*/}

                <p className="font-raleway font-medium mt-4 text-white text-center text-[16px] pl-1">
                    НАЖМИТЕ И УДЕРЖИВАЙТЕ
                    <br /> ДЛЯ ЗАПИСИ
                </p>
            </div>
        </div>
    );
}

export default Audio;
