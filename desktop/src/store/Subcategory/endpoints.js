import { HOST } from 'constants/network';

import axios from 'axios';
const DOMAIN = 'subcategories';

export const getSubcategories = () => {
  return axios.get(`${HOST}/${DOMAIN}`);
};

export const putSubcategory = (id, subcategory) => {
  console.log({ ...subcategory });
  return axios.put(`${HOST}/${DOMAIN}/${id}`, { ...subcategory });
};

export const postSubcategory = subcategory => {
  return axios.post(`${HOST}/${DOMAIN}`, { ...subcategory });
};

export const deleteSubcategory = subcategory => {
  return axios.delete(`${HOST}/${DOMAIN}/${subcategory.id}`);
};
