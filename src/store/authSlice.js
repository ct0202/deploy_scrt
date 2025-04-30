// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage
const loadInitialState = () => {
    const storedState = localStorage.getItem('authState');
    if (storedState) {
        return JSON.parse(storedState);
    }
    return {
        auth_token: null,
        userId: null,
        telegramId: null
    };
};

const initialState = loadInitialState();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthData: (state, action) => {
            const { auth_token, userId, telegramId } = action.payload;
            state.auth_token = auth_token;
            state.userId = userId;
            state.telegramId = telegramId;
            
            // Persist to localStorage
            localStorage.setItem('authState', JSON.stringify(state));
        },
        clearAuthData: (state) => {
            state.auth_token = null;
            state.userId = null;
            state.telegramId = null;
            localStorage.removeItem('authState');
        }
    }
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;