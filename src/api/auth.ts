import api from './api';

const auth = {
  register: async (data: any, config?: any) => await api.post('/auth/register', data, config),

  login: async (data: any, config?: any) => await api.post('auth/login', data, config),

  me: async (config?: any) => await api.get('/me', config),
  update: async (data: any, config?: any) =>
    await api.patch('/me/update', data, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
};

export default auth;
