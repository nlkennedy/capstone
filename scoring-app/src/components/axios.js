import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_HOST || 'http://localhost:8000/'
});

export default axiosInstance;