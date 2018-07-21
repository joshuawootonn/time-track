import { HOST } from 'constants/network';

import axios from 'axios';
const DOMAIN = 'employees';

//http://localhost:4000/api/employees/findone?filter[where][pin]=565656
export const getAccountByPin = pin => {
  return axios.get(`${HOST}/${DOMAIN}/findone?filter[where][pin]=${pin}`);
};


//http://localhost:4000/api/Shifts/findOne?filter[where][employeeId]=1&[order]=id%20DESC

export const getMostRecentShift = id => {
  return axios.get(`${HOST}/${DOMAIN}/findOne?filter[where][${id}]=1&[order]=id%20DESC`)
}