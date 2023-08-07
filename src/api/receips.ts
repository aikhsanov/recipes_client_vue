import api from './api';

const receips = {
  getAll: async (config?: any) => await api.get('/receips', config),
  getById: async (id: string | number, config?) => await api.get(`/receips/${id}`, config),
  create: async (data: any, config?: any) => await api.post('/receips', data, config),
  update: async (id: string | number, data: any, config?: any) =>
    await api.patch(`receips/${id}`, data, config),
  delete: async (id: string | number, config?: any) => await api.delete(`receips/${id}`, config),
};

export default receips;
