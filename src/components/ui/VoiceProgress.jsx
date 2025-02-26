import React, { useState, useEffect } from "react";

const VoiceProgress = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [progress, setProgress] = useState(0); // от 0 до 100
    const totalLength = 630; // замените на длину вашего пути

    useEffect(() => {
        let intervalId;
        if (isRecording) {
            intervalId = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(intervalId);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 100); // каждые 100мс +1%, т.е. 10 секунд до 100%
        } else {
            // сброс прогресса при остановке записи
            setProgress(0);
        }
        return () => clearInterval(intervalId);
    }, [isRecording]);

    // Вычисляем dashoffset для анимации:
    // при progress=0 dashOffset = totalLength, при 100 → 0
    const dashOffset = totalLength - (progress / 100) * totalLength;

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
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

                {/* Статичный внешний контур */}
                <path
                    d="M210 110C210 165.228 165.228 210 110 210C54.7715 210 10 165.228 10 110C10 54.7715 54.7715 10 110 10C165.228 10 210 54.7715 210 110ZM12 110C12 164.124 55.8761 208 110 208C164.124 208 208 164.124 208 110C208 55.8761 164.124 12 110 12C55.8761 12 12 55.8761 12 110Z"
                    fill="#233636"
                />

                {/* Прогресс-бегущая дуга.
            Здесь мы заменили fill на обводку,
            чтобы можно было управлять stroke-dashoffset.
            Задаём id="progressPath", dasharray и dashoffset.
        */}
                <path
                    id="progressPath"
                    d="M110 11.02C110 9.90439 110.905 8.99789 112.02 9.0202C125.98 9.29943 139.738 12.4705 152.423 18.3414C165.719 24.4952 177.517 33.4681 186.998 44.6376C196.48 55.807 203.418 68.9055 207.331 83.0243C211.064 96.4939 211.959 110.585 209.968 124.405C209.808 125.509 208.767 126.254 207.666 126.073C206.565 125.892 205.822 124.853 205.98 123.748C207.877 110.507 207.014 97.0082 203.438 84.1034C199.681 70.5493 193.021 57.9747 183.918 47.2521C174.816 36.5294 163.49 27.9154 150.726 22.0077C138.573 16.383 125.394 13.3397 112.02 13.061C110.905 13.0378 110 12.1356 110 11.02Z"
                    fill="none"
                    stroke="#A1F69E"
                    strokeWidth="2"
                    strokeDasharray={totalLength}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                    className="transition-all duration-200"
                    transform="rotate(-90 110 110)"
                />


                {/* Остальные элементы SVG */}
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M109.143 86C106.464 86 103.895 87.0642 102 88.9586C100.106 90.8529 99.0417 93.4222 99.0417 96.1012V107.843C99.0417 110.522 100.106 113.091 102 114.986C103.895 116.88 106.464 117.944 109.143 117.944C111.822 117.944 114.391 116.88 116.286 114.986C118.18 113.091 119.244 110.522 119.244 107.843V96.1012C119.244 93.4222 118.18 90.8529 116.286 88.9586C114.391 87.0642 111.822 86 109.143 86ZM106.571 127.169V131.326C106.571 132.746 107.723 133.897 109.143 133.897C110.563 133.897 111.714 132.746 111.714 131.326V127.169C121.257 126.721 128.857 118.842 128.857 109.188C128.857 107.768 127.706 106.617 126.286 106.617C124.866 106.617 123.714 107.768 123.714 109.188C123.714 116.289 117.958 122.046 110.857 122.046H109.19C109.174 122.045 109.159 122.045 109.143 122.045C109.127 122.045 109.112 122.045 109.096 122.046H107.429C100.328 122.046 94.5714 116.289 94.5714 109.188C94.5714 107.768 93.4202 106.617 92 106.617C90.5799 106.617 89.4286 107.768 89.4286 109.188C89.4286 118.842 97.0283 126.721 106.571 127.169Z"
                    fill="#A1F69E"
                />
                <circle cx="208" cy="122" r="5" fill="#A1F69E" />
                <circle
                    cx="208"
                    cy="122"
                    r="7.5"
                    stroke="#A1F69E"
                    strokeOpacity="0.2"
                    strokeWidth="5"
                />
            </svg>

            <button
                onClick={() => setIsRecording((prev) => !prev)}
                className="mt-6 px-4 py-2 bg-green-600 text-white rounded"
            >
                {isRecording ? "Остановить" : "Записать"}
            </button>
        </div>
    );
};

export default VoiceProgress;
