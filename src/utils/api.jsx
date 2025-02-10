import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

// Add token automatically to each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Or from context
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
