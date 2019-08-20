import * as IPCConstants from 'constants/ipc';

const { ipcRenderer } = window.require('electron');

export const HOST = () => {
  const settings = ipcRenderer.sendSync(IPCConstants.GET_CRED, ``);
  return `http://${settings.ip}:4000/api`;
};

//{ ip: 'http://localhost:4000/api', username: 'josh', password: '5656' }
