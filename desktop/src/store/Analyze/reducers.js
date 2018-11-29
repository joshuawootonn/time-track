
import { analyzeActionTypes } from 'constants/actionTypeConstants';
import { analyzeStatus } from 'constants/analyze';

export const initialState = {
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
export default (state = initialState, action) => {
  if(!state.hasOwnProperty(action.domain.singular)){
    return state;
  }
  switch (action.type) {
  case analyzeActionTypes.SELECT:
    if ( state[action.domain.singular] !== -1 && state[action.domain.singular] === action.payload) {
      return {
        ...state,
        [action.domain.singular]: -1,
        [`${action.domain.singular}Status`]: analyzeStatus.INIT
      };
    } else  {
      return {
        ...state,
        [action.domain.singular]: action.payload,
        [`${action.domain.singular}Status`]: analyzeStatus.EDITING
      };
    }
  case analyzeActionTypes.SET_STATUS:
    return {
      ...state,
      [`${action.domain.singular}Status`]: action.payload
    };
  case analyzeActionTypes.DELETE_SELECTED: 
    return {
      ...state,
      [`${action.domain.singular}Status`]: analyzeStatus.INIT,
      [action.domain.singular]: -1
    };
  default:
    return state;
  }
};
