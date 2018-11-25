import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import axios from 'axios';

import { employeeActions } from 'store/actions';
import { compareActionTypes,requestMock } from 'helpers/test.helper';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();


describe('Employee Actions', () => {
  beforeEach(() => {
    moxios.install(axios);
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });
  // UPDATE
  test('dispatch 4 actions for updateEmployee', async () => {
    const expectedActionTypes = [
      'update_employee_request',
      'put_employee_request',
      'put_employee_success',
      'show_snack',
      'update_employee_success'
    ];
    requestMock(200,{});   
    await compareActionTypes(expectedActionTypes,store,employeeActions.updateEmployee({ id: 1 }));
  });
  test('dispatch 4 actions for updateEmployee', async () => {
    const expectedActionTypes = [
      'update_employee_request',
      'put_employee_request',
      'put_employee_failure',
      'show_snack',
      'update_employee_failure'
    ];
    requestMock(400,{});
    await compareActionTypes(expectedActionTypes,store,employeeActions.updateEmployee({ id: 1 }));
  });
  // CREATE
  test('dispatch 4 actions for updateEmployee', async () => {
    const expectedActionTypes = [
      'create_employee_request',
      'post_employee_request',
      'post_employee_success',
      'show_snack',
      'create_employee_success'
    ];
    requestMock(200,{});   
    await compareActionTypes(expectedActionTypes,store,employeeActions.createEmployee({ id: 1 }));
  });
  test('dispatch 4 actions for createEmployee', async () => {
    const expectedActionTypes = [
      'create_employee_request',
      'post_employee_request',
      'post_employee_failure',
      'show_snack',
      'create_employee_failure'
    ];
    requestMock(400,{});
    await compareActionTypes(expectedActionTypes,store,employeeActions.createEmployee({ id: 1 }));
  });

});

