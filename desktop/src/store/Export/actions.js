import moment from 'moment'

import { exportActionTypes } from 'constants/ActionTypes';
import {employeeActions, projectActions, projectTaskActions, taskActions,shiftActions } from 'store/actions';

import {employeeSelectors, shiftSelectors, projectSelectors,projectTaskSelectors,activitySelectors, taskSelectors} from 'store/selectors'
import {store} from 'index';

import * as IPCConstants from 'constants/ipc';
import { snackActions } from 'store/actions';
import * as status from 'constants/status';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export const exportToExcel = (exportCategory, start, end, fileLocation) => {
  return async dispatch => {
    dispatch({ type: exportActionTypes.EXPORT_EXCEL_REQUEST });
    try {

      //console.log(exportCategory,new moment(start).format('YYYY-MM-DD HH:mm:ss'),new moment(end).toString(),fileLocation);

      const startMoment = new moment(start).format('YYYY-MM-DD HH:mm:ss');
      const endMoment = new moment(end).format('YYYY-MM-DD HH:mm:ss');
      
      await dispatch(getData(exportCategory,startMoment,endMoment))
      formatData(exportCategory,startMoment,endMoment)
      // //ipcRenderer.sendSync(IPCConstants.CREATE_EXPORT, { fileLocation });
      // formatEmployee();
      

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

export const getData = (exportCategory,startTime, endTime) => {
  // TODO: different actions based on the export category
  return async dispatch => {
    try {
      await Promise.all([
        dispatch(employeeActions.getEmployees()),
        dispatch(projectActions.getProjects()),
        dispatch(projectTaskActions.getProjectTask()),
        dispatch(taskActions.getTasks()),
        dispatch(shiftActions.getShiftsInRange(startTime,endTime))
      ])      

    } catch (e) {
      console.log(e);   
    }
  };
}

const formatData = (exportCategory,startTime,endTime) => {
  // TODO: different formatting routines for the export category
  // array of employees
  const employees = employeeSelectors.getAllEmployees(store.getState())
  // array of shifts w/ embedded activities
  const shifts = shiftSelectors.getShiftsInRange(store.getState(),{startTime,endTime})
  // object of project tasks indexed by id with task and project attached
  const projectTasks = projectTaskSelectors.getAllProjectTasksObjects(store.getState())
  
  
  // let exportData = []
  // employees.forEach(employee => {
  //   exportData.push({
  //     key
  //   })
  // });
}