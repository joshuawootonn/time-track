import {   createCustomAsyncActionType,  createCustomSyncActionType,  createCRUDActionTypes } from 'helpers/actionTypes';

const activityActionTypes = {
  ...createCRUDActionTypes('activity','activities') 
};


const analyzeActionTypes = { 
  SELECT: 'select_domain',
  SET_STATUS: 'set_domain_status',
  DELETE_SELECTED: 'delete_selected'
}; 

const authorityActionTypes = {
  ...createCRUDActionTypes('authority','authorities'),
  EDIT_AUTHORITIES_MODAL: 'edit_authorities_modal'
};

const categoryActionTypes = {
  ...createCRUDActionTypes('category','categories'),
  EDIT_CATEGORIES_MODAL: 'edit_categories_modal'
};

const crewActionTypes = {
  ...createCRUDActionTypes('crew','crews'),
  EDIT_CREWS_MODAL: 'edit_crews_modal'
};

const dimensionActionTypes = {
  ...createCRUDActionTypes('dimension','dimensions')
};
const employeeActionTypes = {
  ...createCRUDActionTypes('employee','employees'),
  ...createCustomAsyncActionType('employee','login'),
  ...createCustomAsyncActionType('employee','clockin'),
  ...createCustomAsyncActionType('employee','clockout'),
  ...createCustomSyncActionType('employee_snack','clockin'),
  ...createCustomSyncActionType('employee_snack','clockout')
};
const exportActionTypes = {
  ...createCustomAsyncActionType('excel','export')
};
const modalActionTypes = {
  ...createCustomSyncActionType('modal','hide'),
  ...createCustomSyncActionType('modal','show'),
};
const projectActionTypes = {
  ...createCRUDActionTypes('project','projects'),
  ...createCustomAsyncActionType('project','update'),
  ...createCustomAsyncActionType('project','create')
};

const projectTaskActionTypes = {
  ...createCRUDActionTypes('project_task','project_tasks')
};

const shiftActionTypes = {
  ...createCRUDActionTypes('shift','shifts'),
  ...createCustomAsyncActionType('shift','create'),
  ...createCustomAsyncActionType('shift','remove'),
  ...createCustomAsyncActionType('shift','edit'), 
  ...createCustomAsyncActionType('current_shift','get') ,  
  ...createCustomAsyncActionType('shifts_in_range','get') 
};
const snackActionTypes = {
  ...createCustomSyncActionType('snack','hide'),
  ...createCustomSyncActionType('snack','show')
};

const staticActionTypes = {
  ...createCustomAsyncActionType('static_data','get')
};

const subcategoryActionTypes = {
  ...createCRUDActionTypes('subcategory','subcategories')
};
const taskActionTypes = {
  ...createCRUDActionTypes('task','tasks')
};

const userActionTypes = {
  ...createCustomAsyncActionType('user','login')
};


export {
  activityActionTypes,
  analyzeActionTypes,
  authorityActionTypes,
  categoryActionTypes,
  crewActionTypes,
  dimensionActionTypes,
  employeeActionTypes,
  exportActionTypes,
  modalActionTypes,
  projectActionTypes,
  projectTaskActionTypes,
  shiftActionTypes,
  snackActionTypes,
  staticActionTypes,
  subcategoryActionTypes,
  taskActionTypes,
  userActionTypes
};
