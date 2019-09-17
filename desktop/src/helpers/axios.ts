import axios, { AxiosRequestConfig } from 'axios';
import { HOST } from 'constants/network';
import * as IPCConstants from 'constants/ipc';

//TODO: FIX THIS IGNORE
//@ts-ignore
const { ipcRenderer } = window.require('electron');

const instance = axios.create({
  baseURL: HOST()
});

export const updateAxiosInstanceWithNewURL = () => {
  instance.defaults.baseURL = HOST();
};

instance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const accessToken = ipcRenderer.sendSync(IPCConstants.GET_ACCESS_TOKEN, ``);

  //TODO: FIX THIS IGNORE
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
