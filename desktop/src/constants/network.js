import * as IPCConstants from 'constants/ipc';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
const settings = ipcRenderer.sendSync(IPCConstants.GET_CRED, '');

export const HOST = `${settings.ip}/api`;

//{ ip: 'http://localhost:4000/api', username: 'josh', password: '5656' }