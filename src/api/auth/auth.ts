import api from '../api';

const auth = {
  register: async (data, config?) => await api.post('/auth/register', data, config),

  login: async (data, config?) => await api.post('auth/login', data, config),

  me: async (config?) => await api.get('/me', config),
};

export default auth;
