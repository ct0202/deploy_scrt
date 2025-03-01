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
        if (blockedRoutes.includes(location.pathname)) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [location.pathname]);

    return null; // Компонент ничего не рендерит, просто управляет стилями
};

export default ScrollBlocker;
