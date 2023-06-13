import { Cred } from './ipc';

export const getAccessToken = (): string | null => {
  return window.localStorage.getItem('@@timetrack:access_token');
};

export const getCred = (): Cred => {
  const value = window.localStorage.getItem('@@timetrack:auth');

  if (value) return JSON.parse(value);

  return {
    ip: '',
    username: '',
    password: ''
  };
};

export const setAccessToken = (value: string) => {
  window.localStorage.setItem('@@timetrack:access_token', value);
};

export const setCred = (ip: string, username: string, password: string) => {
  window.localStorage.setItem(
    '@@timetrack:auth',
    JSON.stringify({
      ip,
      username,
      password
    })
  );
};
