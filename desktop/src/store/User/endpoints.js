import axios from 'axios';
const DOMAIN = `users`;

export const login = (ip, username, password) => {
  return axios.post(`http://${ip}:4000/api/${DOMAIN}/login/`, {
    username,
    password
  }, 
  {
    timeout: 2000
  });
};
