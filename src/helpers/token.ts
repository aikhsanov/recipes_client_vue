export const storeToken = (token) => {
  localStorage.setItem('token', `${token}`);
};

export const getToken = () => {
  return localStorage.getItem('token') || null;
};

export const removeToken = () => {
  return localStorage.removeItem('token');
};
