import { axiosPublic, axiosPrivate } from '../axios';
import { AUTH_TOKEN_KEY } from '../config';
import config from '../config';
import { useDispatch } from 'react-redux';
import { updateRegistrationData, updatePhoto, setAudioMessage } from '../store/userSlice';
import useTelegramId from '../hooks/useTelegramId';
import useUserId from '../hooks/useUserId';
import { toast } from 'react-toastify';

export const useAuth = () => {
    const dispatch = useDispatch();
    const telegramId = useTelegramId();
    const userId = useUserId();

    const initAuth = async () => {
        const status = localStorage.getItem("auth_status");
        if (status === "authorized") {
            return;
        }

        try {
            if (!telegramId) {
                toast.error('Telegram ID not found');
                return;
            }

            const response = await axiosPublic.post(config.API.AUTH.LOGIN, {
                telegramId: telegramId
            });

            handleAuthResponse(response);
        } catch (error) {
            if (error.response?.status === 404) {
                localStorage.setItem("auth_status", 'registering');
                return;
            }
            console.error('Auth initialization error:', error);
            toast.error('Authentication failed');
        }
    };

    const handleAuthResponse = (response) => {
        if (response.data) {
            // Save token
            if (response.data.token) {
                localStorage.setItem("auth_status", 'authorized');
                localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
            }
            
            // Update user data in Redux
            if (response.data.user) {
                const user = response.data.user;
                dispatch(updateRegistrationData({ field: 'name', value: user.name }));
                dispatch(updateRegistrationData({ field: 'gender', value: user.gender }));
                dispatch(updateRegistrationData({ field: 'wantToFind', value: user.wantToFind }));
                dispatch(updateRegistrationData({ field: 'birthDay', value: user.birthDay }));
                dispatch(updateRegistrationData({ field: 'country', value: user.country }));
                dispatch(updateRegistrationData({ field: 'city', value: user.city }));
                dispatch(updateRegistrationData({ field: 'purpose', value: user.purpose }));
                dispatch(updateRegistrationData({ field: 'interests', value: user.interests }));
                
                // Update photos
                if (user.photos) {
                    user.photos.forEach((photo, index) => {
                        if (photo) {
                            dispatch(updatePhoto({ index, photo }));
                        }
                    });
                }
                
                // Update audio message
                if (user.audioMessage) {
                    dispatch(setAudioMessage(user.audioMessage));
                }
            }
        }
    };

    const logout = async () => {
        try {
            await axiosPrivate.post(config.API.AUTH.LOGOUT);
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Logout failed');
        } finally {
            localStorage.removeItem(AUTH_TOKEN_KEY);
            localStorage.removeItem("auth_status");
        }
    };

    const refreshToken = async () => {
        try {
            const response = await axiosPublic.post(config.API.AUTH.REFRESH);
            if (response.data.token) {
                localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
                return true;
            }
        } catch (error) {
            console.error('Token refresh error:', error);
            return false;
        }
    };

    return {
        initAuth,
        logout,
        refreshToken
    };
}; 