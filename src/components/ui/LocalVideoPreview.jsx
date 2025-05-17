import { useEffect, useRef } from "react";

function LocalVideoPreview({ screen }) {
    const videoRef = useRef(null);
    const streamRef = useRef(null);

    useEffect(() => {
        let stopped = false;

        if ((screen === "start" || screen === "wait") && !streamRef.current) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                .then((stream) => {
                    if (stopped) return;
                    streamRef.current = stream;
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.play();
                    }
                })
                .catch((err) => {
                    console.error("Ошибка доступа к камере", err);
                });
        }

        if (screen !== "start" && screen !== "wait" && streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }

        return () => {
            stopped = true;
            // Очищаем только при размонтировании
            if (screen !== "start" && screen !== "wait" && streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
        };
    }, [screen]);

    if (screen === "wait" || screen === "start") {
        return (
            <video
                ref={videoRef}
                muted
                playsInline
                className={
                    screen === "wait"
                        ? "absolute top-[32px] right-[8px] z-[40] w-[80px] h-[140px] rounded-[12px] object-cover"
                        : "absolute top-0 right-0 z-[2] w-full h-full rounded-[12px] object-cover"
                }
            />
        );
    }

    return null;
}

export default LocalVideoPreview;
