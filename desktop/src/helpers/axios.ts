import axios, { AxiosRequestConfig } from 'axios';
import { HOST } from '~/constants/network';
import { getAccessToken } from '~/constants/storage';

const instance = axios.create({
  baseURL: HOST()
});

export const updateAxiosInstanceWithNewURL = () => {
  instance.defaults.baseURL = HOST();
};

instance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const accessToken = getAccessToken();
  //@ts-ignore
  if (config.url.includes('?')) {
    //@ts-ignore
    config.url = config.baseURL + config.url + `&access_token=${accessToken}`;
  } else {
    //@ts-ignore
    config.url = config.baseURL + config.url + `?access_token=${accessToken}`;
  }

  return config;
});

export default instance;
