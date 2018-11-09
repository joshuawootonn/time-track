import { employeeActionTypes,taskActionTypes,projectActionTypes, shiftActionTypes, categoryActionTypes, subcategoryActionTypes } from 'constants/actionTypeConstants';
import {analyzeActionTypes} from 'constants/actionTypeConstants';
import * as analyzeStatus from 'constants/analyze';

const selectedInitialState = {
  employee: -1,
  project: -1,
  task: -1,
  shift: -1,
  authority: -1,
  crew: -1,
  category: -1,
  subcategory: -1,
  employeeStatus: analyzeStatus.INIT,
  projectStatus: analyzeStatus.INIT,
  taskStatus: analyzeStatus.INIT,
  shiftStatus: analyzeStatus.INIT,
  authorityStatus: analyzeStatus.INIT,
  crewStatus: analyzeStatus.INIT,
  categoryStatus: analyzeStatus.INIT,
  subcategoryStatus: analyzeStatus.INIT
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

  case analyzeActionTypes.SELECT_AUTHORITY:
    if (state.authority !== -1 && state.authority === action.payload) {
      return {
        ...state,
        authority: -1,
        authorityStatus: analyzeStatus.INIT
      };
    } else if (state.authority) {
      return {
        ...state,
        authority: action.payload,
        authorityStatus: analyzeStatus.EDITING
      };
    }
    return state;
  case analyzeActionTypes.SET_AUTHORITY_STATUS:
    return {
      ...state,
      authorityStatus: action.payload
    };

 
  case analyzeActionTypes.SELECT_CREW:
    if (state.crew !== -1 && state.crew === action.payload) {
      return {
        ...state,
        crew: -1,
        crewStatus: analyzeStatus.INIT
      };
    } else if (state.crew) {
      return {
        ...state,
        crew: action.payload,
        crewStatus: analyzeStatus.EDITING
      };
    }
    return state;
  case analyzeActionTypes.SET_CREW_STATUS:
    return {
      ...state,
      crewStatus: action.payload
    };




  case analyzeActionTypes.SELECT_CATEGORY:
    if (state.category !== -1 && state.category === action.payload) {
      return {
        ...state,
        category: -1,
        categoryStatus: analyzeStatus.INIT
      };
    } else if (state.category) {
      return {
        ...state,
        category: action.payload,
        categoryStatus: analyzeStatus.EDITING
      };
    }
    return state;
  case analyzeActionTypes.SET_CATEGORY_STATUS:
    return {
      ...state,
      categoryStatus: action.payload
    };

  case categoryActionTypes.DELETE_CATEGORY_SUCCESS:
    return {
      ...state,
      categoryStatus: analyzeStatus.INIT,
      category: -1
    };
    
    

  case analyzeActionTypes.SELECT_SUBCATEGORY:
    if (state.subcategory !== -1 && state.subcategory === action.payload) {
      return {
        ...state,
        subcategory: -1,
        subcategoryStatus: analyzeStatus.INIT
      };
    } else if (state.subcategory) {
      return {
        ...state,
        subcategory: action.payload,
        subcategoryStatus: analyzeStatus.EDITING
      };
    }
    return state;
  case analyzeActionTypes.SET_SUBCATEGORY_STATUS:
    return {
      ...state,
      subcategoryStatus: action.payload
    };

  case subcategoryActionTypes.DELETE_SUBCATEGORY_SUCCESS:
    return {
      ...state,
      subcategoryStatus: analyzeStatus.INIT,
      subcategory: -1
    };


  default:
    return state;
  }
};
