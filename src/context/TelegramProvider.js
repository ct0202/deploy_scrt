import { createContext, useContext, useState, useEffect } from "react";

const TelegramContext = createContext(null);

export const useTelegram = () => useContext(TelegramContext);

export const TelegramProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
            const tg = window.Telegram.WebApp;
            setUser(tg.initData);
    }, []);

    return (
        <TelegramContext.Provider value={{ user }}>
            {children}
        </TelegramContext.Provider>
    );
};
