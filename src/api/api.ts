import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

api.interceptors.request.use(
  async function (config) {
    try {
      const session = localStorage.getItem('session');
      if (session !== undefined && session !== null) {
        config.headers.Authorization = `Bearer ${session}`;
      }
    } catch (err) {
      console.error(err);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
