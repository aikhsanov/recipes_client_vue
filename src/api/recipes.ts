import api from './api';

const recipes = {
  getAll: async (config?: any) => await api.get('/recipes', config),
  getAllFiltered: async (data: any, config?: any) =>
    await api.post('/recipes/filter', data, config),
  getAllByTitle: async (data: any, config?: any) =>
    await api.post('/recipes/bytitle', data, config),
  getById: async (id: string | number, config?) => await api.get(`/recipes/${id}`, config),
  getAllByUser: async (id: string | number, config?) =>
    await api.get(`/recipes/user/${id}`, config),
  create: async (data: any, config?: any) =>
    await api.post('/recipes', data, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  update: async (id: string | number, data: any, config?: any) =>
    await api.patch(`recipes/${id}`, data, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  delete: async (id: string | number, config?: any) => await api.delete(`recipes/${id}`, config),
  uploadImageById: async (id, data: any, config?: any) =>
    await api.post(`/recipes/${id}/images`, data, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  uploadImage: async (data: any, config?: any) =>
    await api.post(`/recipes/images`, data, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  addFavorites: async (data: any, config?: any) =>
    await api.post(`/recipes/favorite/add`, data, {
      ...config,
    }),

  getFavoriteRecipe: async (data: any, config?: any) =>
    await api.post(`/recipes/favorite`, data, {
      ...config,
    }),

  getAllFavoriteRecipes: async (data: any, config?: any) =>
    await api.post(`/recipes/favorite/all`, data, {
      ...config,
    }),

  getAllRecipesByCategory: async (id: number, config?: any) =>
    await api.get(`/recipes/category/${id}`, config),

  addLikes: async (data: any, config?: any) =>
    await api.post(`/recipes/like/add`, data, {
      ...config,
    }),

  addComment: async (id: number, data: any, config?: any) =>
    await api.post(`/recipes/${id}/comment/add`, data, {
      ...config,
    }),
};

export default recipes;
