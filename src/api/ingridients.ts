import api from './api';

const ingridients = {
  getAll: async (config?: any) => await api.get('/ingridients', config),
  getById: async (id: string | number, config?) => await api.get(`/ingridients/${id}`, config),
  create: async (data: any, config?: any) => await api.post('/ingridients', data, config),
  update: async (id: string | number, data: any, config?: any) =>
    await api.patch(`ingridients/${id}`, data, config),
  delete: async (id: string | number, config?: any) =>
    await api.delete(`ingridients/${id}`, config),
};

export default ingridients;
