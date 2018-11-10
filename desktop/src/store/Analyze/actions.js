import { analyzeActionTypes } from 'constants/actionTypeConstants';

export const select = (domain, payload) => {
  return { type: analyzeActionTypes.SELECT, domain, payload };};

export const setStatus = (domain, payload) => {
  return { type: analyzeActionTypes.SET_STATUS, domain, payload };
};

export const deleteSelected = domain => {
  return { type: analyzeActionTypes.DELETE_SELECTED,domain };
};