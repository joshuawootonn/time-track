import moment from 'moment';

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
  subcategoryStatus: analyzeStatus.INIT,
  employeeFilters: {
    firstName: ``,
    lastName: ``,
    pin: ``,
    isEmployed: 1,
    crewId: -1,
    authorityId: -1
  },
  projectFilters: {},
  taskFilters: {},
  shiftFilters: {
    authorityId: -1,
    crewId: -1,
    startTime: moment().subtract(400, `days`).format(`MM-DD-YY HH:mm:ss`), 
    endTime: moment().add(14,`days`).format(`MM-DD-YY HH:mm:ss`) 
  },
  authorityFilters: {},
  crewFilters: {},
  categoryFilters: {},
  subcategoryFilters: {},
  employeeFilterVisible: false,
  projectFilterVisible: false,
  taskFilterVisible: false,
  shiftFilterVisible: false,
  authorityFilterVisible: false,
  crewFilterVisible: false,
  categoryFilterVisible: false,
  subcategoryFilterVisible: false
};
export default (state = initialState, action) => {
  if(action.domain && !state.hasOwnProperty(action.domain.singular)){
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
  case analyzeActionTypes.UPDATE_FILTERS: 
    return {
      ...state,
      [`${action.domain.singular}Filters`]: action.payload
    };
  case analyzeActionTypes.TOGGLE_FILTER:
    return {
      ...state,
      [`${action.domain.singular}FilterVisible`]: !state[`${action.domain.singular}FilterVisible`]
    };
  case analyzeActionTypes.CLEAR_FILTER:    
    return {
      ...state,
      [`${action.domain.singular}Filters`]: initialState[`${action.domain.singular}Filters`]
    };
  default:
    return state;
  }
};
