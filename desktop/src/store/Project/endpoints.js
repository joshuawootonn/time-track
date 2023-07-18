import { generateCRUDEndpoints } from '~/helpers/endpoint.helper';
import axios from '~/helpers/axios';
const DOMAIN = `projects`;

const CRUDendpoints = generateCRUDEndpoints(DOMAIN);

const getProjectTasksByProjectId = project => {
  return axios.get(`/${DOMAIN}/${project.id}/projecttasks`);
};
export const getWithProjectTasks = project => {
  return axios.get(`/${DOMAIN}/${project.id}/?filter[include]=projectTasks`);
};

export default {
  ...CRUDendpoints,
  getWithProjectTasks,
  getProjectTasksByProjectId
};
