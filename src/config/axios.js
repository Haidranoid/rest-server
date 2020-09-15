import Axios from 'axios';
// Creates a new instance of axios
const axios = Axios.create();
// Base URL for all the request
axios.defaults.baseURL = process.env.URL_API;
// Request interceptor for API calls
axios.interceptors.request.use(async config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error)
    });
// Response interceptor for API calls
axios.interceptors.response.use(response => response, async error => {
    const originalRequest = error.config;

    console.log(originalRequest.url);
    if (error.response.status === 401 && originalRequest.url === process.env.URL_API) {
        //history.push('https://facebook.com');
        return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('/login', {"refreshToken": refreshToken});

        if (response.status === 201 || response.status === 200) {
            localStorage.setItem("token", response.data);
            localStorage.setItem("refreshToken", response.data);
            axios.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            return axios(originalRequest);
        }
    }
    return Promise.reject(error);
});

export default axios;
