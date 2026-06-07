import axios from 'axios';
import { API_BASE_URL, AI_SERVICE_URL } from '../utils/constants';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const aiApi = axios.create({
  baseURL: AI_SERVICE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const authService = {
  login: (email, password) => api.post('/users/login', { email, password }),
  register: (data) => api.post('/users/register', data),
  getProfile: () => api.get('/users/profile'),
};

export const predictService = {
  predict: (data) => api.post('/ai/predict', data),
};

export const historyService = {
  getList: () => api.get('/history/list'),
};

export default api;
