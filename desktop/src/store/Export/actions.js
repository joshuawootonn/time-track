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

export const exportToExcel = (exportCategory, start, end, fileLocation) => {
  return async dispatch => {
    dispatch({ type: exportActionTypes.EXPORT_EXCEL_REQUEST });
    try {

      //console.log(exportCategory,new moment(start).format('YYYY-MM-DD HH:mm:ss'),new moment(end).toString(),fileLocation);

      const startMoment = new moment(start).format('YYYY-MM-DD HH:mm:ss');
      const endMoment = new moment(end).format('YYYY-MM-DD HH:mm:ss');

      await dispatch(getData(exportCategory, startMoment, endMoment));
      const exportData = formatData(exportCategory, startMoment, endMoment);
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

export const getData = (exportCategory, startTime, endTime) => {
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

const formatData = (exportCategory, startTime, endTime) => {
  // TODO: different formatting routines for the export category
  // array of employees
  const employees = employeeSelectors.getAllEmployees(store.getState());
  // array of shifts w/ embedded activities
  const shifts = shiftSelectors.getShiftsInRange(store.getState(), { startTime, endTime });
  // object of project tasks indexed by id with task and project attached
  const projectTasks = projectTaskSelectors.getAllProjectTasksObjects(store.getState());

  const projects = projectSelectors.getAllProjectObjects(store.getState());
  console.log(employees, shifts, projectTasks);







  let exportData = [];
  employees.forEach(employee => {
    const detailData = [], summaryData = [];
    const shiftsOfEmployees = shifts.filter(shift => {
      return employee.id === shift.employeeId;
    });
    const styleStrength = {
      1: [],
      2: [],
      3: []
    }
    let totalTimeForWeek = 0;

    const projectTotals = {};

    shiftsOfEmployees.forEach(shift => {
      shift.activities.forEach((activity, i) => {

        // Adding individual activity times 
        let overtimeActivityLength, regularActivityLength;
        let projectId = projectTasks[activity.projectTaskId].project.id;
        if(!projectTotals[projectId]){
          projectTotals[projectId] = {total:0,reg:0,ot:0}
        }
        if (totalTimeForWeek >= 2400) {
          overtimeActivityLength = activity.length
          projectTotals[projectId] = {
            total: projectTotals[projectId].total + activity.length,
            reg: projectTotals[projectId].reg,
            ot: projectTotals[projectId].ot + activity.length
          } 
        } else if (totalTimeForWeek + activity.length >= 2400) {
          overtimeActivityLength = (totalTimeForWeek + activity.length - 2400);
          regularActivityLength = (2400 - totalTimeForWeek);          
          projectTotals[projectId] = {
            total: projectTotals[projectId].total + activity.length,
            reg: projectTotals[projectId].reg + regularActivityLength,
            ot: projectTotals[projectId].ot + overtimeActivityLength
          } 
        } else {
          regularActivityLength = activity.length
          projectTotals[projectId] = {
            total: projectTotals[projectId].total + activity.length,
            reg: projectTotals[projectId].reg + activity.length,
            ot: projectTotals[projectId].ot 
          } 
        }
        console.log(projectTotals)



        totalTimeForWeek += activity.length
        if (i === 0) {
          detailData.push([moment(shift.clockInDate).format('YYYY/MM/DD'),
          moment(shift.clockInDate).format('h:mm a'),
          moment(shift.clockOutDate).format('h:mm a'),
          minutesToString(shift.lunch), projectTasks[activity.projectTaskId].project.name, projectTasks[activity.projectTaskId].task.name, minutesToString(regularActivityLength), minutesToString(overtimeActivityLength)])
        } else {
          detailData.push(['', '', '', '', projectTasks[activity.projectTaskId].project.name, projectTasks[activity.projectTaskId].task.name, minutesToString(regularActivityLength), minutesToString(overtimeActivityLength)])
        }
      })
    });

    for(let key in projectTotals){
      summaryData.push([projects[key].name,'','','','','',minutesToString(projectTotals[key].reg),minutesToString(projectTotals[key].ot),minutesToString(projectTotals[key].total)])
    }

    exportData.push({
      key: `${employee.firstName} ${employee.lastName}`,
      header: [
        ['AACI - Time Sheet'], [`Employee: ${employee.firstName} ${employee.lastName}`], [`Period: ${moment(startTime).format('YYYY/MM/DD')} - ${moment(endTime).format('YYYY/MM/DD')}`]
      ],
      summary: [
        [''], [''],
        ['Summary'],
        ['Project', '', '', '', '','', 'Reg', 'OT', 'Total'],
        ...summaryData
      ],
      details: [
        [''], [''],
        ['Details'],
        ['Date', 'Clock In', 'Clock Out', 'Lunch', 'Project', 'Task', 'Reg', 'OT'],
        ...detailData
      ]
    });
  });

  return exportData;
};
