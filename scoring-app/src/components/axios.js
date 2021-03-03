import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.APP_HOST || 'http://localhost:8000/'
});

export default axiosInstance;