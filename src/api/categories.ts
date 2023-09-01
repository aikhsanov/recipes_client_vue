import api from './api';

const collections = {
  getAll: async (config?: any) => await api.get('/categories', config),
  getAllFiltered: async (data: any, config?: any) =>
    await api.post('/categories/filter', data, config),
  getById: async (id: string | number, config?) => await api.get(`/categories/${id}`, config),
};

export default collections;
