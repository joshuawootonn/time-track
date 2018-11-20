import { HOST } from 'constants/network';
import { generateCRUDEndpoints } from 'helpers/endpoint.helper';
import axios from 'axios';
const DOMAIN = 'projects';

const CRUDendpoints = generateCRUDEndpoints(DOMAIN);

const deleteRelatedProjectTasks = project => {
  console.log(project);
  return axios.delete(`${HOST}/${DOMAIN}/${project.id}/projecttasks`);
};

const getProjectTasksByProjectId = project => {
  return axios.get(`${HOST}/${DOMAIN}/${project.id}/projecttasks`);
};

export default {
  ...CRUDendpoints,
  deleteRelatedProjectTasks,
  getProjectTasksByProjectId
};
