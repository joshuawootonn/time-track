import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { exportActionTypes,snackActionTypes } from 'constants/actionTypeConstants';
import { compareActionTypes } from 'helpers/test.helper';
import { exportToExcel } from 'store/Export/actions';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();
let mock;

describe('Export actions', () => {
  beforeEach(() => {
    store.clearActions();    
    mock = new MockAdapter(axios);    
  });
  // it('exportToExcel shouldn\'t work', async () => {
  //   const expectedActionType = [exportActionTypes.EXPORT_EXCEL_REQUEST,exportActionTypes.EXPORT_EXCEL_FAILURE,snackActionTypes.SHOW_SNACK];
    
  //   await compareActionTypes(expectedActionType,store, exportToExcel(null,new Date(),'C:/'));
  // });
  it('exportToExcel should work', async () => {
    const expectedActionType = [
      'get_employees_request', 'get_employees_success', 
      'get_projects_request', 'get_projects_success',
      'get_tasks_request', 'get_tasks_success',
      'get_project_tasks_request', 'get_project_tasks_success',
      'get_shifts_in_range_request', 'get_shifts_in_range_success',
      exportActionTypes.EXPORT_EXCEL_REQUEST,exportActionTypes.EXPORT_EXCEL_SUCCESS,snackActionTypes.SHOW_SNACK];
    
    mock.onGet().reply(200, {}); 
    await compareActionTypes(expectedActionType,store, exportToExcel(null,new Date(),'C:/'));
  });
});