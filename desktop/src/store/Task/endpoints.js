import { HOST } from 'constants/network';

import axios from 'axios';
const DOMAIN = 'task';

export const getTasks = () => {
  return axios.get(`${HOST}/${DOMAIN}`)
}