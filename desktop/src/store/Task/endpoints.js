//import { HOST } from 'constants/network';
import { generateCRUDEndpoints } from 'helpers/endpoint.helper';

const DOMAIN = `tasks`;


const CRUDEndpoints = generateCRUDEndpoints(DOMAIN);

export default {
  ...CRUDEndpoints
};
