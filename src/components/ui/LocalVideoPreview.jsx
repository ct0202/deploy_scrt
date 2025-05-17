import { useEffect, useRef } from "react";

function LocalVideoPreview({ screen }) {
    const videoRef = useRef(null);
    const streamRef = useRef(null);

    useEffect(() => {
        if (screen === "start") {
            navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                .then((stream) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.play();
                    }
                    streamRef.current = stream;
                })
                .catch((err) => {
                    console.error("Ошибка доступа к камере", err);
                });
        }

        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
        };
    }, [screen]);

    if (screen !== "start") return null;

    return (
        <video
            ref={videoRef}
            muted
            playsInline
            className="absolute top-0 right-0z-[2] w-full h-full rounded-[12px] object-cover"
        />
    );
}

export default LocalVideoPreview;
