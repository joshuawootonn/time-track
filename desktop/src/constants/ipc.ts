export const SET_CRED = `set_cred`;
export const GET_CRED = `get_cred`;
export const CREATE_EXPORT = `create_export`;

export const TOGGLE_FULLSCREEN = `toggle_fullscreen`;
export const IS_FULLSCREEN = `is_fullscreen`;

export const SET_ACCESS_TOKEN = 'set_access_token';
export const GET_ACCESS_TOKEN = 'get_access_token';

export type Cred = {
  ip: string;
  username: string;
  password: string;
};

declare global {
  interface Window {
    electronAPI: {
      set_cred: (cred: Cred) => Cred;
      get_cred: () => Cred;
      create_export: () => string;
      toggle_fullscreen: () => boolean;
      is_fullscreen: () => boolean;
      set_access_token: (token: string) => void;
      get_access_token: () => string;
      message: (cb: () => void) => void;
    };
  }
}

// window.electronAPI = window.electronAPI || {};
