import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3001/app"
    // baseURL: "https://jog-joy-back2-production.up.railway.app"
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token');
    return config
})

export default instance; 