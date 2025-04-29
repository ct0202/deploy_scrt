import { axiosPublic, axiosPrivate } from '../axios';
import {AUTH_TOKEN_KEY} from '../config';
import config from '../config';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId, updateRegistrationData, updatePhoto, setAudioMessage } from '../store/userSlice';
import { useState } from 'react';

export const useAuth = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.userId);
    const telegram_id = localStorage.getItem("telegramId");
    console.log('telegram_id', telegram_id);
    const isTelegram = 1;
    const status = localStorage.getItem("auth_status");

    // const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    console.log("status", status);
    console.log('telegramId check', telegram_id);

    const initAuth = async () => {
        if (status !== "authorized")
        {
            try {
                if (isTelegram) {
                    // if (!userId) {
                        console.log('if telegram_id', telegram_id);
                        const initData = window.Telegram.WebApp.initData;
                        let userData = new URLSearchParams(initData);
                        userData = JSON.parse(userData.get("user"));
                        const telegramId = userData.id;
                        localStorage.setItem('telegramId', telegramId);
                        dispatch(setUserId(telegramId));
                        
                        console.log('login with telegramId', telegramId);
                        const response = await axiosPublic.post(config.API.AUTH.LOGIN, {
                            telegramId: telegramId
                        });
                        console.log('login response', response);
                        handleAuthResponse(response);
                    // }
                } else {
                    if (!userId) {
                        const telegramId = localStorage.getItem('telegramId');
                        if (!telegramId) {
                            console.error('No Telegram ID found in localStorage');
                            return;
                        }
                        
                        dispatch(setUserId(telegramId));
                        
                        const response = await axiosPublic.post(config.API.AUTH.LOGIN, {
                            telegramId: telegramId
                        });
                        
                        handleAuthResponse(response);
                    }
                }
            } catch (error) {
                if(error.status === 404) {
                    localStorage.setItem("auth_status", 'registering');
                    return;
                }
                console.error('Auth initialization error:', error);
                // Clear invalid state
                localStorage.removeItem('telegramId');
                dispatch(setUserId(null));
            }
        }
    };

    const handleAuthResponse = (response) => {
        if (response.data) {
            // Save token
            if (response.data.token) {
                console.log(response.data.user._id);
                
                localStorage.setItem("auth_status", 'authorized');
                localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
                localStorage.setItem("userId", response.data.user._id);
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
        } finally {
            localStorage.removeItem(AUTH_TOKEN_KEY);
            window.location.href = '/';
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