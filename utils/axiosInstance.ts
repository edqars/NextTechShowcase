import axios from "axios";


const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 600,
});

export default axiosInstance;
