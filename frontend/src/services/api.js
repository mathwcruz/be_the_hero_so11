import axios from 'axios'; //importando o axios para lidar com métodos HTTP

const api = axios.create({
  baseURL: 'http://localhost:3333', //a base padrão de toda request
});

export default api;