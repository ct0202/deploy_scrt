import axios from "axios";
import config from "./config";
import { store } from "./store";
import { setAuthData, clearAuthData } from "./store/authSlice";

// Create axios instance with baseURL from config
const axiosPublic = axios.create({
    baseURL: config.API_URL
});

// Create axios instance with baseURL and auth interceptor
const axiosPrivate = axios.create({
    baseURL: config.API_URL
});

// Add auth interceptor to private instance
axiosPrivate.interceptors.request.use((config) => {
    const state = store.getState();
    const { auth_token } = state.auth;
    
    if (auth_token) {
        config.headers.Authorization = `Bearer ${auth_token}`;
    }
    
    return config;
});

// Add response interceptor to handle token refresh
axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // If error is 401 and we haven't tried to refresh token yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                // Try to refresh token
                const response = await axiosPublic.post(config.API.AUTH.REFRESH);
                const { token } = response.data;
                
                // Update token in Redux store
                store.dispatch(setAuthData({ 
                    auth_token: token,
                    telegramId: store.getState().auth.telegramId
                }));
                
                // Retry original request with new token
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axiosPrivate(originalRequest);
            } catch (refreshError) {
                // If refresh fails, clear auth data
                store.dispatch(clearAuthData());
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);

export { axiosPublic, axiosPrivate }; 