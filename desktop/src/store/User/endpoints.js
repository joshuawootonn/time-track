import axios from 'axios';
const DOMAIN = `users`;

export const login = (ip, username, password) => {
  return axios.post(
    `https://${ip}:4000/api/${DOMAIN}/login/`,
    {
      username,
      password
    },
    {
      timeout: 5000
    }
  );
};
