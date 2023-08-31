import api from './api';

const collections = {
  getAll: async (config?: any) => await api.get('/collections', config),
  getAllFiltered: async (data: any, config?: any) =>
    await api.post('/collections/filter', data, config),
  getById: async (id: string | number, config?) => await api.get(`/collections/${id}`, config),
};

export default collections;
