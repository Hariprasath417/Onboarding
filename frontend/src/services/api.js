import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to get headers with token
const getHeaders = () => {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Auth API
export const authAPI = {
  signup: (userData) => api.post('/auth/signup', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me', { headers: getHeaders() }),
};

// Form API
export const formAPI = {
  getForm: () => api.get('/form', { headers: getHeaders() }),
  getStep: (stepNumber) => api.get(`/form/step/${stepNumber}`, { headers: getHeaders() }),
  updateStep: (stepNumber, data) => api.post('/form/step', { stepNumber, data }, { headers: getHeaders() }),
  submitForm: () => api.post('/form/submit', {}, { headers: getHeaders() }),
};

export default api;
