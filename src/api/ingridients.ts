import api from './api';

const ingridients = {
  getAll: async (config?: any) => await api.get('/ingridients', config),
  getAllFiltered: async (data: any, config?: any) =>
    await api.post('/ingridients/filter', data, config),
  getById: async (id: string | number, config?) => await api.get(`/ingridients/${id}`, config),
  create: async (data: any, config?: any) => await api.post('/ingridients', data, config),
  uploadImage: async (id, data: any, config?: any) =>
    await api.post(`/ingridients/${id}/images`, data, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  update: async (id: string | number, data: any, config?: any) =>
    await api.patch(`ingridients/${id}`, data, config),
  delete: async (id: string | number, config?: any) =>
    await api.delete(`ingridients/${id}`, config),
};

export default ingridients;
