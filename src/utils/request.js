import axios from 'axios';
import { BASE_URL } from './config.js';
import { STORAGE } from './constant';
import storage from './storage';

let request = axios.create({
    method: 'post',
    baseURL: BASE_URL,
    withCredentials: true,
    transformRequest: [(data) => {
        data.token = storage.get(STORAGE.TOKEN) || '';
        return JSON.stringify(data);
    }],
    headers: {
        'Access-Control-Allow-Origin': window.location.host,
        'Content-Type': 'application/json',
    }
});

request.interceptors.response.use((response) => {
    if (response.data.code === 1001) {
        setTimeout(() => {
            window.location.href = '/';
        }, 1000);
    }
    return response.data;
}, (error) => {
    console.log(error);
    return { msg: error.message };
});

export default request.post;
