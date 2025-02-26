import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";

import VoiceProgress from "../components/ui/VoiceProgress";

function Step3({ setStep }) {
  console.log("step3");

  return (
    <div className="flex flex-col items-center w-[343px] h-[100%] overflow-x-hidden ">
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
      <button
        className={`border-none text-white text-[18px] opacity-50 mt-[200px] mb-6`}
        onClick={() => setStep(4)}
      >
        Пропустить
      </button>
    </div>
  );
}

export default Step3;
