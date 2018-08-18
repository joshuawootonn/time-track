import { HOST } from 'constants/network';

import axios from 'axios';
const DOMAIN = 'tasks';

export const getTasks = () => {
  return axios.get(`${HOST}/${DOMAIN}`)
}