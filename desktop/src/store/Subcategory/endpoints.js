import { HOST } from 'constants/network';

import axios from 'axios';
const DOMAIN = 'subcategories';

export const getSubcategories = () => {
  return axios.get(`${HOST}/${DOMAIN}`);
};
