import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

//const { VITE_API_URL } = getEnvVariables();
//const { VITE_API_URL } = process.env;
const gestionApi = axios.create({
    baseURL: process.env.VITE_API_URL
});

// Add a request interceptor
gestionApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-token'] = token;
        }
        return config;
    }
)

export default gestionApi;

