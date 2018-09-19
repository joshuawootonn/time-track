import { exportActionTypes } from 'constants/ActionTypes';
import {employeeActions, projectActions, projectTaskActions, taskActions } from 'store/actions';

import {getAllEmployees} from 'store/Employee/selectors'
import {store} from 'index';

import * as IPCConstants from 'constants/ipc';
import { snackActions } from 'store/actions';
import * as status from 'constants/status';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export const exportToExcel = (exportCategory, startTime, timeLength, timeLengthType, fileLocation) => {
  return async dispatch => {
    dispatch({ type: exportActionTypes.EXPORT_EXCEL_REQUEST });
    try {


      await dispatch(getDataForEmployeeExport())
     
      //ipcRenderer.sendSync(IPCConstants.CREATE_EXPORT, { fileLocation });
      formatEmployee();
      

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

export const getDataForEmployeeExport = (startTime, endTime) => {
  return async dispatch => {
    try {
      await Promise.all([
        dispatch(employeeActions.getEmployees()),
        dispatch(projectActions.getProjects()),
        dispatch(projectTaskActions.getProjectTask()),
        dispatch(taskActions.getTasks()),
        dispatch(shiftActions.getShifts(startTime,endTime))
      ])       

    } catch (e) {
      console.log(e);   
    }
  };
}



const formatEmployee = (startTime,timeLength,timeLengthType) => {
  let asdf = {}
  //console.log(getEmployees())

  



}


const getEmployeesasdf = () => {
  return getAllEmployees(store.getState());
}