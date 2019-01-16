import axios from 'axios';
const DOMAIN = 'users';

export const login = (ip, username, password) => {
  return axios.post(`${ip}/api/${DOMAIN}/login/`, {
    username,
    password
  });
};
