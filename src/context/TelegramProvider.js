import { createContext, useContext, useState, useEffect } from "react";

const TelegramContext = createContext(null);

export const useTelegram = () => useContext(TelegramContext);

export const TelegramProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
            const tg = window.Telegram.WebApp;
            try {
                const params = new URLSearchParams(tg.initData);
                setUser(params.get("user"));
                console.log('THE USER : ', params.get("user"));
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
