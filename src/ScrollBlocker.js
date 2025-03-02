import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ScrollBlocker = () => {
    const location = useLocation();

    useEffect(() => {
        const blockedRoutes = [
            "/",
            "/calculatePage",
            "/chat",
            "/watchStreams",
            "/match",
            "/StreamFilters"
        ];

        const updateScroll = () => {
            if (blockedRoutes.includes(location.pathname) && window.innerHeight > 750) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
        };

        updateScroll(); // Проверяем при монтировании
        window.addEventListener("resize", updateScroll);

        return () => {
            window.removeEventListener("resize", updateScroll);
            document.body.style.overflow = ""; // Сбрасываем при размонтировании
        };
    }, [location.pathname]);

    return null;
};

export default ScrollBlocker;
