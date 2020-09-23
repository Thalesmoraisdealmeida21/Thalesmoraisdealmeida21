import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.response.use(
  (respon: AxiosResponse) => {
    return respon;
  },
  err => {
    console.log(err.response.status);
    if (err.response.status === 401) {
      localStorage.removeItem('@ELearned:token');
      localStorage.removeItem('@ELearned:user');
      alert('Tempo de Login Expirado');
      window.location.reload();
    }
  },
);

export default api;
