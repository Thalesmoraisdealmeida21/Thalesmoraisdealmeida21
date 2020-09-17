import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.response.use(
  (respon: AxiosResponse) => {
    return respon;
  },
  () => {
    localStorage.removeItem('@ELearned:token');
    localStorage.removeItem('@ELearned:user');
    window.location.reload();
  },
);

export default api;
