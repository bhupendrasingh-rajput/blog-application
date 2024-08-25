import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:5000/auth';

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
        console.log(error.response.data);
    }
};

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
    }
};
