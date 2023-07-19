export default function isElectron(): boolean {
  return navigator.userAgent.toLowerCase().indexOf(' electron/') > -1
}
