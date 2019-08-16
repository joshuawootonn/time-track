import axios, { AxiosRequestConfig } from 'axios';


import { HOST } from '../constants/network.js';

const instance = axios.create({
  baseURL: HOST(),
});


// TODO: IMPLEMENT AUTHORIZATION HERE IN THE FUTURE

// const publicRoutes = ['/api/login'];

// instance.interceptors.request.use(async (config: AxiosRequestConfig) => {
//   if (!publicRoutes.some((route: string) => (config.url as string).startsWith(route))) {
//     const token = await getTokenSilently();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// });

export default instance;
