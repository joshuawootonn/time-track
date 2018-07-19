import { HOST } from 'constants/network';

import axios from 'axios';
const DOMAIN = 'users';

export const login = (username, password) => {
  return axios.post(`${HOST}/${DOMAIN}/login/`, {
    username,
    password,
  });
};
