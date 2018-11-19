import { HOST } from 'constants/network';
import axios from 'axios';
const DOMAIN = 'employees';
import { generateCRUDEndpoints } from 'helpers/endpoint.helper';

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
