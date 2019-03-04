import { HOST } from 'constants/network';
import axios from 'axios';
import { generateCRUDEndpoints } from 'helpers/endpoint.helper';
const DOMAIN = 'employees';

// CRUD
const CRUDendpoints = generateCRUDEndpoints(DOMAIN);

// EXTRA
const getEmployeeByPin = pin => {
  return axios.get(`${HOST}/${DOMAIN}/findone?filter[where][pin]=${pin}`);
};

export default {
  ...CRUDendpoints,
  getEmployeeByPin
};
