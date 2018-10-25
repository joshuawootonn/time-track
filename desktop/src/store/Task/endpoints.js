import { HOST } from 'constants/network';

import axios from 'axios';
const DOMAIN = 'tasks';

export const getTasks = () => {
  return axios.get(`${HOST}/${DOMAIN}?filter[include][subcategory]=dimension&filter[include][subcategory]=category`);
};

export const postTask = task => {
  return axios.post(`${HOST}/${DOMAIN}`,{ ...task });
};

export const putTask = (id, task) => {
  return axios.put(`${HOST}/${DOMAIN}/${id}`, { ...task });
}

export const deleteTask = task => {
  return axios.delete(`${HOST}/${DOMAIN}/${task.id}`);
};