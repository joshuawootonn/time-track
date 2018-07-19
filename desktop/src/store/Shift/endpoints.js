import { HOST } from 'constants/network';

import axios from 'axios';
const DOMAIN = 'shift';

//http://localhost:4000/api/employees/findone?filter[where][pin]=565656
export const clockIn = (accountId) => {
  return axios.get(`${HOST}/${DOMAIN}/`);
};
