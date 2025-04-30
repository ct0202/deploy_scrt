import { useEffect, useState } from 'react';

export const useTelegramId = () => {
    const [telegramId, setTelegramId] = useState(null);

    useEffect(() => {
        const getTelegramId = () => {
            try {
                // Check if we're in a Telegram Mini App
                if (window.Telegram && window.Telegram.WebApp) {
                    const initData = window.Telegram.WebApp.initData;
                    if (initData) {
                        // Parse initData to get user ID
                        const params = new URLSearchParams(initData);
                        const userData = params.get('user');
                        if (userData) {
                            const user = JSON.parse(userData);
                            if (user && user.id) {
                                const id = user.id.toString();
                                localStorage.setItem('telegramId', id);
                                return id;
                            }
                        }
                    }
                }
                return localStorage.getItem('telegramId');
            } catch (error) {
                console.error('Error getting Telegram ID:', error);
                return localStorage.getItem('telegramId');
            }
        };

        const id = getTelegramId();
        if (id) {
            console.log('tg_id from useTelegramId', id);
            setTelegramId(id);
        }
    }, []);

    return telegramId;
};

export default useTelegramId; 