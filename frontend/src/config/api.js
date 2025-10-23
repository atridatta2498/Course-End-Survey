// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Authentication endpoints
  LOGIN: `${API_URL}/auth/login`,
  ADMIN_LOGIN: `${API_URL}/auth/admin-login`,
  
  // Survey endpoints
  QUESTIONS: `${API_URL}/auth/questions`,
  SUBJECTS: `${API_URL}/auth/subjects`,
  SUBMIT_ANSWERS: `${API_URL}/auth/submitAnswers`,
  CHECK_SUBMISSION: `${API_URL}/auth/check-submission`,
  
  // Admin endpoints
  ADMIN_RESULTS: `${API_URL}/auth/admin/results`,
};

export default {
  API_BASE_URL,
  API_URL,
  API_ENDPOINTS
};
