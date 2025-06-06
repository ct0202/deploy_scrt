import React, { useState } from "react";
import { Button } from "../components/Button";
import VoiceProgress from "../components/ui/VoiceProgress";
import { useDispatch } from 'react-redux';
import { setAudioMessage } from '../store/userSlice';

function Step3({ setStep }) {
  const dispatch = useDispatch();
  const [isRecording, setIsRecording] = useState(false);
  const [RecordingComplete, setRecordingComplete] = useState(false);

    const handleResetRecording = () => {
        setRecordingComplete(false);
        setIsRecording(false);
    };

  const handleRecordingComplete = (audioBlob) => {
    if (!audioBlob) {
      setRecordingComplete(true);
      return;
    }

    const bars = Array(46).fill(7); // fallback in case processing fails
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // First read ArrayBuffer for processing
    const arrayBufferReader = new FileReader();
    arrayBufferReader.onloadend = () => {
      const arrayBuffer = arrayBufferReader.result;

      audioContext.decodeAudioData(arrayBuffer)
        .then(audioBuffer => {
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

          // Now read base64
          const dataUrlReader = new FileReader();
          dataUrlReader.onloadend = () => {
            dispatch(setAudioMessage({
              file: dataUrlReader.result, // base64
              bars: heights
            }));
            setRecordingComplete(true);
          };
          dataUrlReader.readAsDataURL(audioBlob);
        })
        .catch((err) => {
          console.error("Error decoding audio:", err);
          setRecordingComplete(true);
        });
    };

    arrayBufferReader.readAsArrayBuffer(audioBlob);
  };


  return (
    <div className="flex flex-col items-center w-[343px] h-[750px] overflow-y-auto overflow-x-hidden ">
      <h1 className="font-raleway font-semibold mt-6 text-white text-[20px]">
        Аудио визитка (30 сек)
      </h1>
      <h1 className="font-raleway font-light mt-2 text-white text-center text-[16px]">
        Расскажите немного о себе другим пользователям. При необходимости аудио
        визитку можно будет перезаписать или удалить
      </h1>

        <VoiceProgress
            onRecordingStateChange={setIsRecording}
            onRecordingComplete={handleRecordingComplete}
            onResetRecording={handleResetRecording}
        />


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
      {RecordingComplete &&
        <div className="fixed bottom-[130px]">
          <Button onClick={() => setStep(4)}>Далее</Button>
        </div>
      }
    </div>
  );
}

export default Step3;
