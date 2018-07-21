import { HOST } from 'constants/network';

import axios from 'axios';
const DOMAIN = 'employees';

// CRUD

export const putEmployee = (id, employee) => {
  return axios.put(`${HOST}/${DOMAIN}/${id}`, {
    ...employee,
  });
};

//EXTRA

//http://localhost:4000/api/employees/findone?filter[where][pin]=565656
export const getEmployeeByPin = pin => {
  return axios.get(`${HOST}/${DOMAIN}/findone?filter[where][pin]=${pin}`);
};
