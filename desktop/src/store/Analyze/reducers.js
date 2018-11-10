import { employeeActionTypes, taskActionTypes, projectActionTypes, shiftActionTypes, categoryActionTypes, subcategoryActionTypes } from 'constants/actionTypeConstants';
import { analyzeActionTypes } from 'constants/actionTypeConstants';
import { analyzeStatus, domains } from 'constants/analyze';

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
  console.log(action);
  switch (action.type) {
  case analyzeActionTypes.SELECT:
    if (state[action.domain] !== -1 && state[action.domain] === action.payload) {
      return {
        ...state,
        [action.domain]: -1,
        [`${action.domain}Status`]: analyzeStatus.INIT
      };
    } else if (state[action.domain]) {
      return {
        ...state,
        [action.domain]: action.payload,
        [`${action.domain}Status`]: analyzeStatus.EDITING
      };
    }
    return state;
  case analyzeActionTypes.SET_STATUS:
    return {
      ...state,
      [`${action.domain}Status`]: action.payload
    };
  case analyzeActionTypes.DELETE_SELECTED: 
    return {
      ...state,
      [`${action.domain}Status`]: analyzeStatus.INIT,
      [action.domain]: -1
    };
  default:
    return state;
  }
};
