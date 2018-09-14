import { exportActionTypes } from 'constants/ActionTypes';

import * as IPCConstants from 'constants/ipc';
import { snackActions } from 'store/actions';
import * as status from 'constants/status';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export const exportToExcel = (exportCategory, startTime, timeLength, timeLengthType, fileLocation) => {
  return async dispatch => {
    dispatch({ type: exportActionTypes.EXPORT_EXCEL_REQUEST });
    try {
      ipcRenderer.sendSync(IPCConstants.CREATE_EXPORT, { fileLocation });

      await dispatch(snackActions.openSnack(status.SUCCESS, 'Export Success!'));
      return dispatch({ type: exportActionTypes.EXPORT_EXCEL_SUCCESS });
    } catch (e) {
      console.log(e);
      dispatch(snackActions.openSnack(status.FAILURE, 'Export failed!'));
      return dispatch({
        type: exportActionTypes.EXPORT_EXCEL_FAILURE,
        payload: e
      });
    }
  };
};
