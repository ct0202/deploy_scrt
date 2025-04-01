import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import ListenVoice from "../components/ui/ListenVoice";
import VoiceProgress from "../components/ui/VoiceProgress";

function Step3({ setStep }) {
  console.log("step3");

  const [isRecording, setIsRecording] = useState(false);
  const [RecordingComplete, setRecordingComplete] = useState(false);

  return (
    <div className="flex flex-col items-center w-[343px] h-[750px] overflow-y-auto overflow-x-hidden ">
      <h1 className="font-raleway font-semibold mt-6 text-white text-[20px]">
        Аудио визитка (30 сек)
      </h1>
      <h1 className="font-raleway font-light mt-2 text-white text-center text-[16px]">
        Расскажите немного о себе другим пользователям. При необходимости аудио
        визитку можно будет перезаписать или удалить
      </h1>

      {/* <img
        src="/icons/Recorder.svg"
        className="w-[220px] h-[220px] mt-10"
        alt="recorder icon"
      /> */}

      <VoiceProgress onRecordingStateChange={setIsRecording} onRecordingComplete={() => setRecordingComplete(true)} />

      {!RecordingComplete && (
        <>
      <p className="font-raleway font-medium mt-4 text-white text-center text-[16px] pl-1">
        {isRecording ? "ИДЁТ ЗАПИСЬ..." : (
          <>
            НАЖМИТЕ И УДЕРЖИВАЙТЕ
            <br /> ДЛЯ ЗАПИСИ
          </>
        )}
      </p>
      <button
        className={`border-none text-white text-[18px] opacity-50 mt-[150px] mb-6`}
        onClick={() => setStep(4)}
      >
        Пропустить
      </button>
      </>
      )}
    </div>
  );
}

export default Step3;
