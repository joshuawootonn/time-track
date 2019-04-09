//import { HOST } from 'constants/network';
import { generateCRUDEndpoints } from 'helpers/endpoint.helper';
//import axios from 'axios';
const DOMAIN = `tasks`;

// const get = () => {
//   return axios.get(`${HOST}/${DOMAIN}?filter[include][subcategory]=dimension&filter[include][subcategory]=category`);
// };
const CRUDEndpoints = generateCRUDEndpoints(DOMAIN);

export default {
  ...CRUDEndpoints
};