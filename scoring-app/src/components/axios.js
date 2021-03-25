import axios from 'axios';
require('dotenv').config();

// these settings are used for all API calls
const axiosInstance = axios.create({
    baseURL:
        process.env.NODE_ENV === 'production'
            ? 'https://intellisquash.herokuapp.com/'
            : 'http://127.0.0.1:8000/',
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
});

export default axiosInstance;
