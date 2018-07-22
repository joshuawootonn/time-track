import { HOST } from 'constants/network';

import axios from 'axios';
const DOMAIN = 'crews';

export const getCrews = () => {
  return axios.get(`${HOST}/${DOMAIN}`)
}