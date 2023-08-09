import axios from './axios.js';

export const pedirRegistro = (user) => axios.post(`/registro`, user);
export const accederPlataforma = (user) => axios.post(`/acceder`, user);
export const verificarPeticionToken = () => axios.get('/verificar');
export const verPerfil = () => axios.get('/perfil');

