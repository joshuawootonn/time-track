import { analyzeActionTypes } from 'constants/actionTypeConstants';

export const selectEmployee = employee => {
  return { type: analyzeActionTypes.SELECT_EMPLOYEE, payload: employee };    
};
export const setEmployeeStatus = status => {
  return { type: analyzeActionTypes.SET_EMPLOYEE_STATUS, payload: status };    
};
export const selectTask = task => {
  return { type: analyzeActionTypes.SELECT_TASK, payload: task };    
};
export const setTaskStatus = status => {
  return { type: analyzeActionTypes.SET_TASK_STATUS, payload: status };    
};

export const selectProject = project => {
  return { type: analyzeActionTypes.SELECT_PROJECT, payload: project };    
};
export const setProjectStatus = status => {
  return { type: analyzeActionTypes.SET_PROJECT_STATUS, payload: status };    
};

export const selectShift = shift => {
  return { type: analyzeActionTypes.SELECT_SHIFT, payload: shift };
};
export const setShiftStatus = status => {
  return { type: analyzeActionTypes.SET_SHIFT_STATUS, payload: status };
};

export const selectAuthority = authority => {
  return { type: analyzeActionTypes.SELECT_AUTHORITY, payload: authority };
};
export const setAuthorityStatus = status => {
  return { type: analyzeActionTypes.SET_AUTHORITY_STATUS, payload: status };
};

export const selectCrew = crew => {
  return { type: analyzeActionTypes.SELECT_CREW, payload: crew };
};
export const setCrewStatus = status => {
  return { type: analyzeActionTypes.SET_CREW_STATUS, payload: status };
};

export const selectCategory = category => {
  return { type: analyzeActionTypes.SELECT_CATEGORY, payload: category };
};
export const setCategoryStatus = status => {
  return { type: analyzeActionTypes.SET_CATEGORY_STATUS, payload: status };
};

export const selectSubcategory = subcategory => {
  return { type: analyzeActionTypes.SELECT_SUBCATEGORY, payload: subcategory };
};
export const setSubcategoryStatus = status => {
  return { type: analyzeActionTypes.SET_SUBCATEGORY_STATUS, payload: status };
};