import { createContext, useContext, useState, useEffect } from "react";

const TelegramContext = createContext(null);

export const useTelegram = () => useContext(TelegramContext);

export const TelegramProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
            const tg = window.Telegram.WebApp;
            try {
                const params = new URLSearchParams(tg.initData);
                const userData = params.get("user");
                if (userData) {
                    setUser(JSON.parse(decodeURIComponent(userData)));
                }
            }
            catch (e) {
                console.error(e);
            }
    }, []);

    return (
        <TelegramContext.Provider value={{ user }}>
            {children}
        </TelegramContext.Provider>
    );
};
