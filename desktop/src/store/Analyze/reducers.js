import { analyzeActionTypes, employeeActionTypes,taskActionTypes,projectActionTypes, shiftActionTypes } from 'constants/ActionTypes';
import * as analyzeStatus from 'constants/analyze';

const selectedInitialState = {
  employee: -1,
  project: -1,
  task: -1,
  shift: -1,
  employeeStatus: analyzeStatus.INIT,
  projectStatus: analyzeStatus.INIT,
  taskStatus: analyzeStatus.INIT,
  shiftStatus: analyzeStatus.INIT
};
export default (state = selectedInitialState, action) => {
  switch (action.type) {
  case analyzeActionTypes.SELECT_EMPLOYEE:
    if (state.employee !== -1 && state.employee === action.payload) {
      return {
        ...state,
        employee: -1,
        employeeStatus: analyzeStatus.INIT
      };
    } else if (state.employee) {
      return {
        ...state,
        employee: action.payload,
        employeeStatus: analyzeStatus.EDITING
      };
    }
    return state;
  case analyzeActionTypes.SET_EMPLOYEE_STATUS:
    return {
      ...state,
      employeeStatus: action.payload
    };

  case employeeActionTypes.DELETE_EMPLOYEE_SUCCESS:
    return {
      ...state,
      employeeStatus: analyzeStatus.INIT,
      employee: -1
    };



  case analyzeActionTypes.SELECT_TASK:
    if (state.task !== -1 && state.task === action.payload) {
      return {
        ...state,
        task: -1,
        taskStatus: analyzeStatus.INIT
      };
    } else if (state.task) {
      return {
        ...state,
        task: action.payload,
        taskStatus: analyzeStatus.EDITING
      };
    }
    return state;
  case analyzeActionTypes.SET_TASK_STATUS:
    return {
      ...state,
      taskStatus: action.payload
    };

  case taskActionTypes.DELETE_TASK_SUCCESS:
    return {
      ...state,
      taskStatus: analyzeStatus.INIT,
      task: -1
    };

  case analyzeActionTypes.SELECT_PROJECT:
    if (state.project !== -1 && state.project === action.payload) {
      return {
        ...state,
        project: -1,
        projectStatus: analyzeStatus.INIT
      };
    } else if (state.project) {
      return {
        ...state,
        project: action.payload,
        projectStatus: analyzeStatus.EDITING
      };
    }
    return state;
  case analyzeActionTypes.SET_PROJECT_STATUS:
    return {
      ...state,
      projectStatus: action.payload
    };

  case projectActionTypes.DELETE_PROJECT_SUCCESS:
    return {
      ...state,
      projectStatus: analyzeStatus.INIT,
      project: -1
    };

  case analyzeActionTypes.SELECT_SHIFT:
    if (state.shift !== -1 && state.shift === action.payload) {
      return {
        ...state,
        shift: -1,
        shiftStatus: analyzeStatus.INIT
      };
    } else if (state.shift) {
      return {
        ...state,
        shift: action.payload,
        shiftStatus: analyzeStatus.EDITING
      };
    }
    return state;
  case analyzeActionTypes.SET_SHIFT_STATUS:
    return {
      ...state,
      shiftStatus: action.payload
    };

  case shiftActionTypes.DELETE_SHIFT_SUCCESS:
    return {
      ...state,
      shiftStatus: analyzeStatus.INIT,
      shift: -1
    };

  default:
    return state;
  }
};
