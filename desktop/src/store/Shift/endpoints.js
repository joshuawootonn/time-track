import { HOST } from 'constants/network';

import axios from 'axios';
const DOMAIN = 'shifts';

//http://localhost:4000/api/employees/findone?filter[where][pin]=565656
export const postShift = shift => {
  return axios.post(`${HOST}/${DOMAIN}`, {
    ...shift,
  });
};

export const putShift = shift => {
  return axios.put(`${HOST}/${DOMAIN}`, {
    ...shift,
  });
};

export const getCurrentShift = employeeId => {
  return axios.get(
    `${HOST}/employees/${employeeId}/shifts?filter[limit]=1&filter[order]=id DESC`,
  );
};
