import * as IPCConstants from 'constants/ipc';

const electron = window.require(`electron`);
const ipcRenderer = electron.ipcRenderer;

export const HOST = () => {
  const settings = ipcRenderer.sendSync(IPCConstants.GET_CRED, ``);
  return `http://${settings.ip}:4000/api`;
};

//{ ip: 'http://localhost:4000/api', username: 'josh', password: '5656' }