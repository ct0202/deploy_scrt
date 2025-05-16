import { axiosPublic, axiosPrivate } from '../axios';
import { AUTH_TOKEN_KEY } from '../config';
import config from '../config';
import { useDispatch, useSelector } from 'react-redux';
import { updateRegistrationData, updatePhoto, setAudioMessage } from '../store/userSlice';
import { setAuthData, clearAuthData } from '../store/authSlice';
import { toast } from 'react-toastify';
import {store} from "../store/store";

export const useAuth = () => {
    const dispatch = useDispatch();
    const { telegramId, auth_token } = useSelector(state => state.auth);

    const initAuth = async () => {
        // if (auth_token) {
        //     return;
        // }

        try {
            if (!telegramId) {
                // toast.error('Telegram ID not found');
                return;
            }
            
            const response = await axiosPublic.post(config.API.AUTH.LOGIN, {
                telegramId: telegramId
            });
            // console.log('login response: ', response);
            handleAuthResponse(response);
        } catch (error) {
            // if (error.response?.status === 404) {
            //     dispatch(setAuthData({
            //         auth_token: null,
            //         userId: null,
            //         telegramId: telegramId
            //     }));
            //     return;
            // }
            console.error('Auth initialization error:', error);
            // toast.error('Authentication failed');
        }
    };

    const handleAuthResponse = (response) => {
        if (response.data) {
            // Update auth data in Redux
            if (response.data.token) {
                dispatch(setAuthData({
                    auth_token: response.data.token,
                    userId: response.data.user?._id,
                    telegramId: telegramId
                }));
                // console.log("Redux state in handleAuthResponse:", store.getState());
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
            dispatch(clearAuthData());
        }
    };

    const refreshToken = async () => {
        try {
            const response = await axiosPublic.post(config.API.AUTH.REFRESH);
            if (response.data.token) {
                dispatch(setAuthData({ 
                    auth_token: response.data.token,
                    userId: null,
                    telegramId: telegramId
                }));
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