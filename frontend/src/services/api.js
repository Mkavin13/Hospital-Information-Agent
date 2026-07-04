import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getDoctors = async () => {
  const response = await apiClient.get('/doctors');
  return response.data;
};

export const searchDoctors = async (keyword) => {
  const response = await apiClient.get(`/doctors/search?keyword=${encodeURIComponent(keyword)}`);
  return response.data;
};

export const getDoctorsByDepartment = async (deptName) => {
  const response = await apiClient.get(`/doctors/department/${encodeURIComponent(deptName)}`);
  return response.data;
};

export const getDepartments = async () => {
  const response = await apiClient.get('/departments');
  return response.data;
};

export const getDepartmentById = async (id) => {
  const response = await apiClient.get(`/departments/${id}`);
  return response.data;
};

export const getFaqs = async () => {
  const response = await apiClient.get('/faqs');
  return response.data;
};

export const searchFaqs = async (keyword) => {
  const response = await apiClient.get(`/faqs/search?keyword=${encodeURIComponent(keyword)}`);
  return response.data;
};

export const getContact = async () => {
  const response = await apiClient.get('/contact');
  return response.data;
};

export const sendChatMessage = async (message) => {
  const response = await apiClient.post('/chat', { message });
  return response.data;
};

export default {
  getDoctors,
  searchDoctors,
  getDoctorsByDepartment,
  getDepartments,
  getDepartmentById,
  getFaqs,
  searchFaqs,
  getContact,
  sendChatMessage,
};
