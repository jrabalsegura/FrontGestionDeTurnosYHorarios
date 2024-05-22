import axios from 'axios';

const gestionApi = axios.create({
    baseURL: process.env.API ? process.env.API : 'https://gestion-horarios-cd0d24b996c6.herokuapp.com'
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

