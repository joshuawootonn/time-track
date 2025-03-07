const { contextBridge, ipcRenderer } = require('electron')

const IPCConstants = {
  SET_CRED: 'set_cred',
  GET_CRED: 'get_cred',
  SET_ACCESS_TOKEN: 'set_access_token',
  GET_ACCESS_TOKEN: 'get_access_token',
  CREATE_EXPORT: 'create_export',
  CREATE_CSV_EXPORT: `create_csv_export`,
  TOGGLE_FULLSCREEN: `toggle_fullscreen`,
  IS_FULLSCREEN: `is_fullscreen`,
}

contextBridge.exposeInMainWorld('electronAPI', {
  [IPCConstants.GET_CRED]: () =>
    ipcRenderer.sendSync(IPCConstants.GET_CRED, ``),
  [IPCConstants.SET_CRED]: (cred) =>
    ipcRenderer.sendSync(IPCConstants.SET_CRED, cred),
  [IPCConstants.GET_ACCESS_TOKEN]: () =>
    ipcRenderer.sendSync(IPCConstants.GET_ACCESS_TOKEN, ``),
  [IPCConstants.SET_ACCESS_TOKEN]: (token) =>
    ipcRenderer.sendSync(IPCConstants.SET_ACCESS_TOKEN, token),
  [IPCConstants.CREATE_EXPORT]: (_) =>
    ipcRenderer.sendSync(IPCConstants.CREATE_EXPORT, _),
  [IPCConstants.CREATE_CSV_EXPORT]: (_) =>
    ipcRenderer.sendSync(IPCConstants.CREATE_CSV_EXPORT, _),
  [IPCConstants.TOGGLE_FULLSCREEN]: (_) =>
    ipcRenderer.sendSync(IPCConstants.TOGGLE_FULLSCREEN, _),
  [IPCConstants.IS_FULLSCREEN]: (_) =>
    ipcRenderer.sendSync(IPCConstants.IS_FULLSCREEN, _),
  ['message']: (cb) => ipcRenderer.on(`message`, cb),
})
