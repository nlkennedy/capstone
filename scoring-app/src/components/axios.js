import axios from 'axios';
require('dotenv').config();

// these settings are used for all API calls
const axiosInstance = axios.create({
    baseURL: 'https://intellisquash.herokuapp.com/', //process.env.REACT_APP_BACKEND || 'http://localhost:5000/',
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
});

export default axiosInstance;
