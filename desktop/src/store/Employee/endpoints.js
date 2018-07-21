import { HOST } from 'constants/network';

import axios from 'axios';
const DOMAIN = 'employees';

export const updateEmployee = (id, employee) => {
  return axios.put(`${HOST}/${DOMAIN}/${id}`, {
    ...employee,
  });
};
