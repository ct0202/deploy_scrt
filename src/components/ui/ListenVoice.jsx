import React, { useState, useRef } from "react";

const ListenVoice = ({ preSignedAudio, bars }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleAudioEnded = () => {
        setIsPlaying(false);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    // Вычисляем, сколько палочек должно быть закрашено
    const getBarColor = (index, currentTime, duration) => {
        if (!audioRef.current) return "#085252";
        const progress = (currentTime / audioRef.current.duration) * 42;
        return index <= progress ? "#A1F69E" : "#085252";
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="w-[343px] h-[64px] border border-[#233636] bg-[#022424] gap-[17px] rounded-[8px] flex items-center justify-center">
            <button 
                onClick={togglePlay}
                className="ml-[10px] w-8 h-8 flex items-center justify-center bg-[#A1F69E] rounded-full"
            >
                {isPlaying ? (
                    <object data="/icons/VoiceStopButton.svg" type="image/svg+xml" className="w-[44px] h-[44px] pointer-events-none" aria-label="Остановить воспроизведение" />
                ) : (
                    <object data="/icons/VoiceStartButton.svg" type="image/svg+xml" className="w-[44px] h-[44px] pointer-events-none" aria-label="Начать воспроизведение" />
                )}
            </button>
            <div className="flex-1 h-[30px] w-[206px] overflow-hidden">
                <div className="flex items-center gap-[2px]">
                    {Array.from({ length: 46 }).map((_, index) => (
                        <div
                            key={index}
                            className="w-[2px] h-[40px] rounded-[13px]"
                            style={{
                                height:  `${bars? bars[index] : "20"}px`,
                                backgroundColor: getBarColor(index, currentTime, audioRef.current?.duration)
                            }}
                        />
                    ))}
                </div>
            </div>
            <span className="text-white font-medium mr-[13px]">
                {formatTime(currentTime)}
            </span>
            <audio 
                ref={audioRef}
                src={preSignedAudio} 
                onEnded={handleAudioEnded}
                onTimeUpdate={handleTimeUpdate}
                className="hidden"
            />
        </div>
    );
};

export default ListenVoice;