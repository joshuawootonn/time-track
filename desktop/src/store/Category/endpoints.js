import { HOST } from 'constants/network';

import axios from 'axios';
const DOMAIN = 'categories';

export const getCategories = () => {
  return axios.get(`${HOST}/${DOMAIN}`);
};

export const putCategory = (id, category) => {
  return axios.put(`${HOST}/${DOMAIN}/${id}`, { ...category });
};

export const postCategory = category => {
  return axios.post(`${HOST}/${DOMAIN}`, { ...category });
};

export const deleteCategory = category => {
  return axios.delete(`${HOST}/${DOMAIN}/${category.id}`);
};
