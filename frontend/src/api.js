// frontend/src/api.js
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api/auth',
    withCredentials: true
});

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            const { data } = await API.get('/refresh');
            localStorage.setItem('accessToken', data.accessToken);
            API.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
            return API(originalRequest);
        }
        return Promise.reject(error);
    }
);

export const login = (credentials) => API.post('/login', credentials);
export const signup = (credentials) => API.post('/signup', credentials);
export const logout = () => API.post('/logout');