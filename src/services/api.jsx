import axios from 'axios';

const BASE_URL = import.meta.env.BACKEND_BASE_URL || "http://localhost:8081";
// browser cannot compile process. will be fixed later

export default axios.create({
    baseURL: BASE_URL,
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
    withCredentials: true
})