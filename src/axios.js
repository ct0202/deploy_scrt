import axios from "axios";
import config from "./config";
import { store } from "./store";
import { setAuthData, clearAuthData } from "./store/authSlice";

// Create axios instance with baseURL from config
const axiosPublic = axios.create({
    baseURL: config.API_URL
});

const axiosPrivate = axios.create({
    baseURL: config.API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export { axiosPublic, axiosPrivate }; 