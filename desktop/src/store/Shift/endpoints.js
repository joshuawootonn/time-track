import { HOST } from 'constants/network';

import axios from 'axios';
const DOMAIN = 'shifts';

//http://localhost:4000/api/employees/findone?filter[where][pin]=565656
export const clockIn = (clockInObject) => {
  return axios.post(`${HOST}/${DOMAIN}`, {
    ...clockInObject
  });
};
