import { HOST } from 'constants/network';

import axios from 'axios';
const DOMAIN = 'projecttasks';

export const getProjectTasks = () => {
  return axios.get(`${HOST}/${DOMAIN}`);
};
export const postProjectTask = projectTask => {
  return axios.post(`${HOST}/${DOMAIN}`,{ ...projectTask });
};

export const putProjectTask = projectTask => {
  return axios.put(`${HOST}/${DOMAIN}/${projectTask.id}`,{ ...projectTask });
};
export const deleteProjectTask = projectTask => {
  return axios.delete(`${HOST}/${DOMAIN}/${projectTask.id}`,{ ...projectTask });
};