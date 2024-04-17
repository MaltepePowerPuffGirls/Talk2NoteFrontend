import axios from 'axios';

const BASE_URL = 'https://talk2notebackend-production.up.railway.app'

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