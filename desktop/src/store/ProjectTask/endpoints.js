import { HOST } from 'constants/network';

import axios from 'axios';
const DOMAIN = 'projecttasks';

export const getProjectTasks = () => {
  return axios.get(`${HOST}/${DOMAIN}`);
};
