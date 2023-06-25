import axios from "axios";

export const $axios = axios.create({
    baseURL: 'http://127.0.0.1:8001/api/v1/',
    headers: {
        'Content-Type': 'application/json',
    }
})