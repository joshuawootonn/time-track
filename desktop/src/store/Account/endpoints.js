import { HOST } from 'constants/network';

import axios from 'axios';
const DOMAIN = 'employees';

//http://localhost:4000/api/employees/findone?filter[where][pin]=565656
export const getAccountByPin = pin => {
  return axios.get(`${HOST}/${DOMAIN}/findone?filter[where][pin]=${pin}`);
};
