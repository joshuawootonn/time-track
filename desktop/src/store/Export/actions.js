import moment from 'moment';

import { exportActionTypes } from 'constants/ActionTypes';
import { employeeActions, projectActions, projectTaskActions, taskActions, shiftActions } from 'store/actions';

import { employeeSelectors, shiftSelectors, projectTaskSelectors, projectSelectors } from 'store/selectors';
import { minutesToString } from 'helpers/time';
import { store } from 'index';

import * as IPCConstants from 'constants/ipc';
import { snackActions } from 'store/actions';
import * as status from 'constants/status';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export const exportToExcel = (exportCategory, start, fileLocation) => {
  return async dispatch => {
    dispatch({ type: exportActionTypes.EXPORT_EXCEL_REQUEST });
    try {

      //console.log(exportCategory,new moment(start).format('YYYY-MM-DD HH:mm:ss'),new moment(end).toString(),fileLocation);

      const startMoment = new moment(start).format('YYYY-MM-DD HH:mm:ss');
      const endMoment = new moment(start).add(7,'days').format('YYYY-MM-DD HH:mm:ss');

      await dispatch(getData(startMoment, endMoment));
      const exportData = formatData(startMoment, endMoment);

      ipcRenderer.sendSync(IPCConstants.CREATE_EXPORT, { fileLocation, data: exportData });
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

export const getData = (startTime, endTime) => {
  // TODO: different actions based on the export category
  return async dispatch => {
    try {
      await Promise.all([
        dispatch(employeeActions.getEmployees()), dispatch(projectActions.getProjects()), dispatch(projectTaskActions.getProjectTask()), dispatch(taskActions.getTasks()), dispatch(shiftActions.getShiftsInRange(startTime, endTime))
      ]);
    } catch (e) {
      console.log(e);
    }
  };
};

const formatData = (startTime, endTime) => {
  // TODO: different formatting routines for the export category
  // array of employees
  const employees = employeeSelectors.getAllEmployees(store.getState())
    // sort so that employees get added in order
    .sort((a,b)=> a.lastName + a.firstName > b.lastName + b.firstName);
  // array of shifts w/ embedded activities
  const shifts = shiftSelectors
    .getShiftsInRange(store.getState(), { startTime, endTime })
    .sort((a,b)=> a.clockInDate > b.clockInDate);
  // object of project tasks indexed by id with task and project attached
  const projectTasks = projectTaskSelectors.getAllProjectTasksObjects(store.getState());
  const projects = projectSelectors.getAllProjectObjects(store.getState());

  let exportData = [];
  employees.forEach(employee => {
    const detailData = [], summaryData = [];
    const shiftsOfEmployees = shifts.filter(shift => {
      return employee.id === shift.employeeId;
    });


    const individualProjectTotals = {};
    const allProjectTotals = { total: 0, reg: 0, ot: 0 };

    // Summary 
    let totalTimeForWeek = 0;
    shiftsOfEmployees.forEach(shift => {
      shift.activities.forEach(activity => {

        // Adding individual activity times 
        let currentProjectId = projectTasks[activity.projectTaskId].project.id;

        // if project hasn't been added to total 
        if (!individualProjectTotals[currentProjectId]) {
          individualProjectTotals[currentProjectId] = { total: 0, reg: 0, ot: 0 };
        }

        if (totalTimeForWeek >= 2400) {
          allProjectTotals.total += activity.length;
          allProjectTotals.ot += activity.length;
          individualProjectTotals[currentProjectId].total += activity.length;
          individualProjectTotals[currentProjectId].ot += activity.length;

        } else if (totalTimeForWeek + activity.length >= 2400) {

          allProjectTotals.total += activity.length;
          allProjectTotals.reg += (2400 - totalTimeForWeek);
          allProjectTotals.ot += (totalTimeForWeek + activity.length - 2400);
          individualProjectTotals[currentProjectId].total += activity.length;
          individualProjectTotals[currentProjectId].reg += (2400 - totalTimeForWeek);
          individualProjectTotals[currentProjectId].ot += (totalTimeForWeek + activity.length - 2400);

        } else {

          allProjectTotals.total += activity.length;
          allProjectTotals.reg += activity.length;
          individualProjectTotals[currentProjectId].total += activity.length;
          individualProjectTotals[currentProjectId].reg += activity.length;

        }
        totalTimeForWeek += activity.length;
      });
    });
    // add all summary rows
    for (let key in individualProjectTotals) {
      summaryData.push([projects[key].name, '', '', '', '', minutesToString(individualProjectTotals[key].reg), minutesToString(individualProjectTotals[key].ot), minutesToString(individualProjectTotals[key].total)]);
    }
    // add the total summary row
    summaryData.push(['Total', '', '', '', '', minutesToString(allProjectTotals.reg), minutesToString(allProjectTotals.ot), minutesToString(allProjectTotals.total)]);


    // Details 
    totalTimeForWeek = 0;
    shiftsOfEmployees.forEach(shift => {
      shift.activities.forEach((activity, i) => {
        let overtimeActivityLength, regularActivityLength;

        if (totalTimeForWeek >= 2400) {
          regularActivityLength = activity.length;
        } else if (totalTimeForWeek + activity.length >= 2400) {
          overtimeActivityLength = (totalTimeForWeek + activity.length - 2400);
          regularActivityLength = (2400 - totalTimeForWeek);
        } else {
          overtimeActivityLength = activity.length;
        }

        totalTimeForWeek += activity.length;
        if (i === 0) {
          detailData.push([
            moment(shift.clockInDate).format('MM/DD/YYYY'), moment(shift.clockInDate).format('h:mm a'), moment(shift.clockOutDate).format('h:mm a'), minutesToString(shift.lunch), projectTasks[activity.projectTaskId].project.name, projectTasks[activity.projectTaskId].task.name, minutesToString(regularActivityLength), minutesToString(overtimeActivityLength)]);
        } else {
          detailData.push(['','','','',projectTasks[activity.projectTaskId].project.name, projectTasks[activity.projectTaskId].task.name, minutesToString(regularActivityLength), minutesToString(overtimeActivityLength)]);
        }
      });
    });


    // Style
    const spacerRows = Object.keys(individualProjectTotals).length;
    const sheetStyles = {
      1: [1],
      2: [6, spacerRows + 11],
      3: [2, 3, 7, spacerRows + 8, spacerRows + 12],
      spacerRows
    };

    exportData.push({
      key: `${employee.firstName} ${employee.lastName}`,
      header: [
        ['AACI - Time Sheet'], [`Employee: ${employee.firstName} ${employee.lastName}`], [`Period: ${moment(startTime).format('YYYY/MM/DD')} - ${moment(endTime).format('YYYY/MM/DD')}`]
      ],
      summary: [
        [''], [''], ['Summary','', '', '', ''], ['Project', '', '', '', '', 'Reg', 'OT', 'Total'], ...summaryData
      ],
      details: [
        [''], [''], ['Details'], ['Date', 'Clock In', 'Clock Out', 'Lunch', 'Project', 'Task', 'Reg', 'OT'], ...detailData
      ],
      sheetStyles
    });
  });
  return exportData;
};
