import axios from 'axios';

// Use an environment variable for the API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://192.168.1.16:5001';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// User API
export const createUser = (payload) => {
  return api.post('/users', payload);
};

export const getAllUsers = () => {
  return api.get('/users');
};

export const getUserById = (id) => {
  return api.get(`/users/${id}`);
};

export const updateUserById = (id, payload) => {
  return api.put(`/users/${id}`, payload);
};

export const deleteUserById = (id) => {
  return api.delete(`/users/${id}`);
};

// Course API
export const createCourse = (payload) => {
  return api.post('/courses', payload);
};

export const getAllCourses = () => {
  return api.get('/courses');
};

export const getCourseById = (id) => {
  return api.get(`/courses/${id}`);
};

export const updateCourseById = (id, payload) => {
  return api.put(`/courses/${id}`, payload);
};

export const deleteCourseById = (id) => {
  return api.delete(`/courses/${id}`);
};

// Round API
export const createRound = (payload) => {
  return api.post('/rounds', payload);
}

export const getAllRounds = () => {
  return api.get('/rounds');
};

export const getRoundById = (id) => {
  return api.get(`/rounds/${id}`);
};

export const updateRoundById = (id, payload) => {
  return api.put(`/rounds/${id}`, payload);
};

export const deleteRoundById = (id) => {
  return api.delete(`/rounds/${id}`);
};