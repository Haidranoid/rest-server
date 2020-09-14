import axios from 'axios';
import {} from "../lib/utils/localStorageService";

// Creates a new instance of axios
const axiosInstance = axios.create();
// Base URL for all the request
axiosInstance.defaults.baseURL = process.env.URL_API;
// Request interceptor for API calls
axiosInstance.interceptors.request.use(async config => {
        const token = localStorage.getItem('access_token');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        config.headers['Content-Type'] = 'application/json';

        return config;
    },
    error => {
        Promise.reject(error)
    });
// Response interceptor for API calls
axiosInstance.interceptors.response.use(response => response
    , async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && originalRequest.url === process.env.URL_API) {
            history.push('https://facebook.com');
            return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refresh_token');
            const response = await axiosInstance.post('/login', {"refresh_token": refreshToken});

            if (response.status === 201 || response.status === 200) {
                localStorage.setItem("access_token", response.data);
                localStorage.setItem("refresh_token", response.data);
                axios.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
                return axiosInstance(originalRequest);
            }
        }
        return Promise.reject(error);
    });

export default axiosInstance;
