import { HOST } from 'constants/network';

import axios from 'axios';
const DOMAIN = 'categories';

export const getCategories = () => {
  return axios.get(`${HOST}/${DOMAIN}`);
};
