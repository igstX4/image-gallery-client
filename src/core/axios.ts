import axios from "axios";


export const API_URL = 'http://localhost:5000/api';

const $api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})
$api.interceptors.request.use(async config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export default $api