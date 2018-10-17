import { HOST } from 'constants/network';

import axios from 'axios';
const DOMAIN = 'dimensions';

export const getDimensions = () => {
  return axios.get(`${HOST}/${DOMAIN}`);
};
