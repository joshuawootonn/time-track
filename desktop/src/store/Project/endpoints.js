import { HOST } from 'constants/network';

import axios from 'axios';
const DOMAIN = 'projects';

export const getProjects = () => {
  return axios.get(`${HOST}/${DOMAIN}`);
};
export const postProject = project => {
  return axios.post(`${HOST}/${DOMAIN}`,{ ...project });
};

export const putProject = (id, project) => {
  return axios.put(`${HOST}/${DOMAIN}/${id}`, { ...project });
};

export const deleteProject = project => {
  return axios.delete(`${HOST}/${DOMAIN}/${project.id}`);
};
export const deleteRelatedProjectTasks = project => {
  console.log(project);
  return axios.delete(`${HOST}/${DOMAIN}/${project.id}/projecttasks`);
};

export const getProjectTasksByProjectId = project => {
  return axios.get(`${HOST}/${DOMAIN}/${project.id}/projecttasks`);
}