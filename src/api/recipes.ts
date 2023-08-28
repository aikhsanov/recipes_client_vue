import api from './api';

const recipes = {
  getAll: async (config?: any) => await api.get('/recipes', config),
  getById: async (id: string | number, config?) => await api.get(`/recipes/${id}`, config),
  create: async (data: any, config?: any) => await api.post('/recipes', data, config),
  update: async (id: string | number, data: any, config?: any) =>
    await api.patch(`recipes/${id}`, data, config),
  delete: async (id: string | number, config?: any) => await api.delete(`recipes/${id}`, config),
  uploadImage: async (id, data: any, config?: any) =>
    await api.post(`/recipes/${id}/images`, data, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
};

export default recipes;
