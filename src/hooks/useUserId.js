import { useEffect, useState } from 'react';

export const useUserId = () => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    console.log('userId from useUserId', userId);

    return userId;
};

export default useUserId; 