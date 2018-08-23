import { HOST } from 'constants/network';

import axios from 'axios';
const DOMAIN = 'activities';

export const postActivity = activity => {
  return axios.post(`${HOST}/${DOMAIN}`, {
    ...activity,
  });
};