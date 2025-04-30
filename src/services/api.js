import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/accounts/',
});

// Attach access token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const registerUser = (userData) => API.post('register/', userData);
export const loginUser = (userData) => API.post('login/', userData);
export const refreshToken = () =>
  API.post('token/refresh/', {
    refresh: localStorage.getItem('refresh'),
  });

// Query
export const submitQuery = (queryData) => API.post('queries/', queryData);
export const fetchMyQueries = () => API.get('queries/history/');

export default API;
