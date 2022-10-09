export const HOST = () => {
  const settings = window.electronAPI.get_cred();
  return `${settings.ip}/api`;
};
