// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    auth_token: null,
    userId: null,
    telegramId: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTelegramId: (state, action) => {
            state.telegramId = action.payload;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        },  
        setAuthToken: (state, action) => {
            state.auth_token = action.payload;
        },
        setAuthData: (state, action) => {
            const { auth_token, userId, telegramId } = action.payload;
            state.auth_token = auth_token;
            state.userId = userId;
            state.telegramId = telegramId;
        },
        clearAuthData: (state) => {
            state.auth_token = null;
            state.userId = null;
            state.telegramId = null;
        }
    }
});

export const { setAuthData, clearAuthData, setTelegramId, setUserId, setAuthToken } = authSlice.actions;
export default authSlice.reducer;