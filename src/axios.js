import axios from "axios";
import config from "./config";
import { AUTH_TOKEN_KEY } from "./config";

// Create axios instance with baseURL from config
const axiosPublic = axios.create({
    baseURL: config.API_URL
});

// Create axios instance with baseURL and auth interceptor
const axiosPrivate = axios.create({
    baseURL: config.API_URL
});

// Function to get user ID that works in both React and non-React contexts
const getUserId = () => {
    // First try to get from localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
        return storedUserId;
    }
    return null;
};

// Add auth interceptor to private instance
axiosPrivate.interceptors.request.use((config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const userId = getUserId();
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    if (userId) {
        config.headers['X-User-Id'] = userId;
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
                
                // Save new token
                localStorage.setItem(AUTH_TOKEN_KEY, token);
                
                // Retry original request with new token
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axiosPrivate(originalRequest);
            } catch (refreshError) {
                // If refresh fails, clear token and redirect to login
                localStorage.removeItem(AUTH_TOKEN_KEY);
                // window.location.href = '/';
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);

export { axiosPublic, axiosPrivate, getUserId }; 