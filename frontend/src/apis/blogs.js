import axios from 'axios';

const API_URL = 'http://localhost:5000/blog';

const token = sessionStorage.getItem('token');

export const fetchBlogs = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
        console.log(error.response.data);
    }
};

export const fetchBlogById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
        console.log(error.response.data);
    }
};

export const createBlog = async (blogData) => {
    try {
        const headers = { 'Authorization': token };
        const response = await axios.post(`${API_URL}`, blogData, { headers });
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
        console.log(error.response.data);
    }
};

export const updateBlog = async (id, blogData) => {
    try {
        const headers = { 'Authorization': token };
        const response = await axios.put(`${API_URL}/${id}`, blogData, { headers });
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
        console.log(error.response.data);
    }
};

export const deleteBlog = async (id) => {
    try {
        const headers = { 'Authorization': token };
        const response = await axios.delete(`${API_URL}/${id}`, { headers });
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
        console.log(error.response.data);
    }
};
