import axios from '~/helpers/axios';
import { generateCRUDEndpoints } from '~/helpers/endpoint.helper';
const DOMAIN = `employees`;

// CRUD
const CRUDendpoints = generateCRUDEndpoints(DOMAIN);

// EXTRA
const getEmployeeByPin = pin => {
  return axios.get(`/${DOMAIN}/findone?filter[where][pin]=${pin}`, {
    timeout: 5000
  });
};

export default {
  ...CRUDendpoints,
  getEmployeeByPin
};
