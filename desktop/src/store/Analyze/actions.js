import { analyzeActionTypes } from 'constants/actionTypeConstants';
import { modalActions } from 'store/actions';

export const select = (domain, payload) => {
  return { type: analyzeActionTypes.SELECT, domain, payload };
};

export const setStatus = (domain, payload) => {
  return { type: analyzeActionTypes.SET_STATUS, domain, payload };
};

export const deleteSelected = domain => {
  return { type: analyzeActionTypes.DELETE_SELECTED, domain };
};

export const editSettingsModal = () => {
  return modalActions.openModal(analyzeActionTypes.EDIT_SETTINGS_MODAL, null);
};

export const exportDataModal = () => {
  return modalActions.openModal(analyzeActionTypes.EXPORT_DATA_MODAL, null);
};

export const updateFilter = (domain, payload) => {
  return { type: analyzeActionTypes.UPDATE_FILTERS, domain, payload };
};

export const toggleFilter = domain => {
  return { type: analyzeActionTypes.TOGGLE_FILTER, domain };
};

export const clearFilter = domain => {
  return { type: analyzeActionTypes.CLEAR_FILTER, domain };
};
