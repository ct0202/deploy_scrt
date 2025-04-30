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
        setAuthData: (state, action) => {
            const { auth_token, userId, telegramId } = action.payload;
            state.auth_token = auth_token;
            state.userId = userId;
            state.telegramId = telegramId;
            
            // Sync with localStorage
            if (auth_token) {
                localStorage.setItem('token', auth_token);
            } else {
                localStorage.removeItem('token');
            }
        },
        clearAuthData: (state) => {
            state.auth_token = null;
            state.userId = null;
            state.telegramId = null;
            localStorage.removeItem('token');
        }
    }
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;