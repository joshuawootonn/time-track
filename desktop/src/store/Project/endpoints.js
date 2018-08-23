import { HOST } from 'constants/network';

import axios from 'axios';
const DOMAIN = 'projects';

export const getProjects = () => {
  return axios.get(`${HOST}/${DOMAIN}`);
};
