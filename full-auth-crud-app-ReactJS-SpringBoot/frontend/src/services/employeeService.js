// employeeService.js
// src/services/employeeService.js
import api from './api';

export const getEmployees = () => api.get('/employees');

export const createEmployee = (data) => {
    return api.post('/employees', data)
        .then(res => {
            console.log("✅ Created employee:", res.data);
            return res;
        })
        .catch(err => {
            console.error("❌ POST Error:", err.response?.data || err.message);
            throw err;
        });
};

export const updateEmployee = (id, data) => {
    return api.put(`/employees/${id}`, data)
        .then(res => {
            console.log("✅ Updated employee:", res.data);
            return res;
        })
        .catch(err => {
            console.error("❌ PUT Error:", err.response?.data || err.message);
            throw err;
        });
};

export const deleteEmployee = (id) => api.delete(`/employees/${id}`);