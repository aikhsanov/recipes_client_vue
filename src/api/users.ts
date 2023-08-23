import api from './api';

const users = {
  getAll: async (config?: object) => await api.get('/users', config),
  getAllFiltered: async (data?: object | [], config?: object) =>
    await api.post('/users/filter', data, config),
  getById: async (id: number | string, config?: object) => await api.get(`/users/${id}`, config),
};

export default users;
