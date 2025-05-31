import api from './api';

export const fetchAllUsers = () => api.get('/admin/users');
export const fetchAllEmployees = () => api.get('/admin/employees');
