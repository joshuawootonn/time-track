import { HOST } from 'constants/network';

import axios from 'axios';
const DOMAIN = 'tasks';

export const getTasks = () => {
  //  if normalizr was good.
  return axios.get(`${HOST}/${DOMAIN}?filter[include]=dimension&filter[include][subcategory]=category`);
};

//