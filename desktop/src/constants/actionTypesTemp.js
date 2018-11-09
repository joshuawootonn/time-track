import { createCustomActionTypes,createCRUDActionTypes } from 'helpers/actionTypes';

const activityActionTypes = {
  ...createCRUDActionTypes('activity') 
};


const analyzeActionTypes = {
  SELECT_EMPLOYEE: 'select_employee',
  SET_EMPLOYEE_STATUS: 'set_employee_status',  
  SELECT_TASK: 'select_task',
  SET_TASK_STATUS: 'set_task_status',  
  SELECT_PROJECT: 'select_project',
  SET_PROJECT_STATUS: 'set_project_status',  
  SELECT_SHIFT: 'select_shift',
  SET_SHIFT_STATUS: 'set_shift_status',  
  SELECT_CREW: 'select_crew',
  SET_CREW_STATUS: 'set_crew_status',  
  SELECT_AUTHORITY: 'select_authority',
  SET_AUTHORITY_STATUS: 'set_authority_status',  
  SELECT_CATEGORY: 'select_category',
  SET_CATEGORY_STATUS: 'set_category_status',  
  SELECT_SUBCATEGORY: 'select_subcategory',
  SET_SUBCATEGORY_STATUS: 'set_subcategory_status'
}; 

const authorityActionTypes = {
  ...createCRUDActionTypes('authority'),
  EDIT_AUTHORITIES_MODAL: 'edit_authorities_modal'
};

const categoryActionTypes = {
  ...createCRUDActionTypes('category'),
  EDIT_CATEGORIES_MODAL: 'edit_categories_modal'
};

const crewActionTypes = {
  ...createCRUDActionTypes('crew'),
  EDIT_CREWS_MODAL: 'edit_crews_modal'
};

const dimensionActionTypes = {
  ...createCRUDActionTypes('dimension')
};
const employeeActionTypes = {
  ...createCRUDActionTypes('employee'),
  ...createCustomActionTypes('shift','login'),
  ...createCustomActionTypes('shift','clockin'),
  CLOCKIN_EMPLOYEE_SNACK: 'clockin_employee_snack',
  ...createCustomActionTypes('shift','clockout'),
  CLOCKOUT_EMPLOYEE_SNACK: 'clockout_employee_snack'
};
const exportActionTypes = {
  ...createCustomActionTypes('excel','export')
};
const modalActionTypes = {
  HIDE_MODAL: 'hide_modal',
  SHOW_MODAL: 'show_modal'
};
const projectActionTypes = {
  ...createCRUDActionTypes('project'),
  ...createCustomActionTypes('project','update'),
  ...createCustomActionTypes('project','create')
};

const projectTaskActionTypes = {
  ...createCRUDActionTypes('project_task')
};

const shiftActionTypes = {
  ...createCRUDActionTypes('shift'),
  ...createCustomActionTypes('shift','create'),
  ...createCustomActionTypes('shift','remove'),
  ...createCustomActionTypes('shift','edit'), 
  ...createCustomActionTypes('current_shift','get') ,  
  ...createCustomActionTypes('shifts_in_range','get') 
};
const snackActionTypes = {
  HIDE_SNACK: 'hide_snack',
  SHOW_SNACK: 'show_snack'
};

const staticActionTypes = {
  ...createCustomActionTypes('static_data','get')
};

const subcategoryActionTypes = {
  ...createCRUDActionTypes('subcategory')
};
const taskActionTypes = {
  ...createCRUDActionTypes('task')
};

const userActionTypes = {
  ...createCustomActionTypes('user','login')
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
