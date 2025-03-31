import React, { useState, useEffect, useRef } from "react";

const VoiceProgress = ({ onRecordingStateChange }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [progress, setProgress] = useState(0);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    const radius = 100;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        let intervalId;
        if (isRecording) {
            intervalId = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        stopRecording();
                        return 100;
                    }
                    return prev + 0.5;
                });
            }, 50);
        } else {
            setProgress(0);
        }
        return () => clearInterval(intervalId);
    }, [isRecording]);

    useEffect(() => {
        onRecordingStateChange?.(isRecording);
    }, [isRecording, onRecordingStateChange]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            // Проверяем поддерживаемые MIME-типы
            let mimeType = 'audio/webm';
            if (MediaRecorder.isTypeSupported('audio/webm')) {
                mimeType = 'audio/webm';
            } else if (MediaRecorder.isTypeSupported('audio/ogg')) {
                mimeType = 'audio/ogg';
            } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
                mimeType = 'audio/mp4';
            }
            
            console.log('Используемый MIME-тип:', mimeType);
            
            mediaRecorderRef.current = new MediaRecorder(stream, {
                mimeType: mimeType
            });
            chunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: mimeType });
                setAudioBlob(blob);
                console.log('Запись завершена, размер:', blob.size);
            };

            mediaRecorderRef.current.start(100);
            setIsRecording(true);
        } catch (error) {
            console.error('Ошибка при запуске записи:', error);
            alert('Не удалось получить доступ к микрофону');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
        setIsRecording(false);
    };

    useEffect(() => {
        if (audioBlob) {
            const url = URL.createObjectURL(audioBlob);
            setAudioUrl(url);
            return () => {
                if (url) {
                    URL.revokeObjectURL(url);
                }
            };
        }
    }, [audioBlob]);

    const handleTouchStart = async () => {
        if (!isRecording) {
            await startRecording();
        }
    };

    const handleTouchEnd = () => {
        if (isRecording) {
            stopRecording();
        }
    };

    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="w-[220px] h-[220px] relative mt-10">
            <svg
                width="220"
                height="220"
                viewBox="0 0 220 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Фоновые круги */}
                <circle opacity="0.2" cx="110" cy="110" r="100" fill="#233636" />
                <circle opacity="0.2" cx="110" cy="110" r="50" fill="#233636" />
                <circle opacity="0.2" cx="110" cy="110" r="79" fill="#233636" />

                {/* Внешний контур */}
                <path
                    d="M210 110C210 165.228 165.228 210 110 210C54.7715 210 10 165.228 10 110C10 54.7715 54.7715 10 110 10C165.228 10 210 54.7715 210 110ZM12 110C12 164.124 55.8761 208 110 208C164.124 208 208 164.124 208 110C208 55.8761 164.124 12 110 12C55.8761 12 12 55.8761 12 110Z"
                    fill="#233636"
                />

                {/* Прогресс */}
                <circle
                    cx="110"
                    cy="110"
                    r={radius}
                    fill="none"
                    stroke="#A1F69E"
                    strokeWidth="2"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform="rotate(-90 110 110)"
                    className="transition-all duration-100 ease-linear"
                />

                {/* Иконка микрофона */}
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M109.143 86C106.464 86 103.895 87.0642 102 88.9586C100.106 90.8529 99.0417 93.4222 99.0417 96.1012V107.843C99.0417 110.522 100.106 113.091 102 114.986C103.895 116.88 106.464 117.944 109.143 117.944C111.822 117.944 114.391 116.88 116.286 114.986C118.18 113.091 119.244 110.522 119.244 107.843V96.1012C119.244 93.4222 118.18 90.8529 116.286 88.9586C114.391 87.0642 111.822 86 109.143 86ZM106.571 127.169V131.326C106.571 132.746 107.723 133.897 109.143 133.897C110.563 133.897 111.714 132.746 111.714 131.326V127.169C121.257 126.721 128.857 118.842 128.857 109.188C128.857 107.768 127.706 106.617 126.286 106.617C124.866 106.617 123.714 107.768 123.714 109.188C123.714 116.289 117.958 122.046 110.857 122.046H109.19C109.174 122.045 109.159 122.045 109.143 122.045C109.127 122.045 109.112 122.045 109.096 122.046H107.429C100.328 122.046 94.5714 116.289 94.5714 109.188C94.5714 107.768 93.4202 106.617 92 106.617C90.5799 106.617 89.4286 107.768 89.4286 109.188C89.4286 118.842 97.0283 126.721 106.571 127.169Z"
                    fill="#A1F69E"
                    opacity={isRecording ? "1" : "0.4"}
                />

                {/* Индикатор прогресса */}
                <circle
                    cx={110 + Math.cos(-Math.PI/2 + 2 * Math.PI * progress/100) * radius}
                    cy={110 + Math.sin(-Math.PI/2 + 2 * Math.PI * progress/100) * radius}
                    r="5"
                    fill="#A1F69E"
                    opacity={isRecording ? "1" : "0"}
                    className="transition-all duration-100 ease-linear"
                />
                <circle
                    cx={110 + Math.cos(-Math.PI/2 + 2 * Math.PI * progress/100) * radius}
                    cy={110 + Math.sin(-Math.PI/2 + 2 * Math.PI * progress/100) * radius}
                    r="7.5"
                    stroke="#A1F69E"
                    strokeOpacity="0.2"
                    strokeWidth="5"
                    opacity={isRecording ? "1" : "0"}
                    className="transition-all duration-100 ease-linear"
                />
            </svg>

                <button
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleTouchStart}
                    onMouseUp={handleTouchEnd}
                    onMouseLeave={handleTouchEnd}
                    className="absolute inset-0 w-full h-full cursor-pointer"
                />
        
            
            {audioUrl && (
                <div className="mt-4 w-full max-w-[300px]">
                    <audio 
                        controls 
                        src={audioUrl} 
                        className="w-full"
                        controlsList="nodownload"
                        preload="auto"
                    >
                        Ваш браузер не поддерживает аудио-плеер.
                    </audio>
                </div>
            )}
        </div>
    );
};

export default VoiceProgress;
