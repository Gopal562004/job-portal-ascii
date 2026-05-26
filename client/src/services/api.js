import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// ========== Candidate APIs (Public) ==========
export const submitApplication = (formData) => {
  return api.post('/candidates/apply', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// ========== Admin APIs ==========
export const adminLogin = (credentials) => {
  return api.post('/admin/login', credentials);
};

export const forgotPassword = (data) => {
  return api.post('/admin/forgot-password', data);
};

export const verifyOTP = (data) => {
  return api.post('/admin/verify-otp', data);
};

export const resetPassword = (data) => {
  return api.post('/admin/reset-password', data);
};

export const getAdminProfile = () => {
  return api.get('/admin/profile');
};

export const getDashboardStats = () => {
  return api.get('/admin/dashboard');
};

export const getCandidates = (params) => {
  return api.get('/admin/candidates', { params });
};

export const getCandidate = (id) => {
  return api.get(`/admin/candidates/${id}`);
};

export const scheduleInterview = (id, data) => {
  return api.put(`/admin/candidates/${id}/interview`, data);
};

export const updateCandidateStatus = (id, data) => {
  return api.put(`/admin/candidates/${id}/status`, data);
};

export const deleteCandidate = (id) => {
  return api.delete(`/admin/candidates/${id}`);
};

// Also export for admin routes that use /api/candidates/:id (public get)
export const getCandidatePublic = (id) => {
  return api.get(`/candidates/${id}`);
};

export default api;
