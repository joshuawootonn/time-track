import * as IPCConstants from 'constants/ipc';

const { ipcRenderer } = window.require('electron');

export const HOST = () => {
  const settings = ipcRenderer.sendSync(IPCConstants.GET_CRED, ``);
  return `${settings.ip}/api`;
};