import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

const gestionApi = axios.create({
    baseURL: VITE_API_URL
});

// Add a request interceptor

export default gestionApi;

