import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import axios from 'axios';

import { genericActions } from 'store/actions';
import { compareActionTypes, requestMock } from 'helpers/test.helper';
import domains from 'constants/domains';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

describe('Generic Actions', () => {
  beforeEach(() => {
    moxios.install(axios);
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });
  // GET ALL
  test('dispatch 2 actions for getAll action on success', () => {
    requestMock(200,[]);
    const expectedActionTypes = [ 'get_employees_request', 'get_employees_success'];   
    return compareActionTypes(expectedActionTypes,store,genericActions.getAll(domains.EMPLOYEE));
  });
  test('dispatch 2 actions for getAll action on failure', () => {
    requestMock(400,[]);
    const expectedActionTypes = [ 'get_employees_request', 'get_employees_failure'];        
    return compareActionTypes(expectedActionTypes,store,genericActions.getAll(domains.EMPLOYEE)); 
  });
  // GET
  test('dispatch 2 actions for get action on success', () => {
    requestMock(200,[]);
    const expectedActionTypes = [ 'get_employee_request', 'get_employee_success'];        
    return compareActionTypes(expectedActionTypes,store,genericActions.get(domains.EMPLOYEE,1)); 
  }); 
  test('dispatch 2 actions for get action on failure', () => {
    requestMock(400,[]);
    const expectedActionTypes = [ 'get_employee_request', 'get_employee_failure'];        
    return compareActionTypes(expectedActionTypes,store,genericActions.get(domains.EMPLOYEE,1)); 
  }); 
  // PUT
  test('dispatch 2 actions for put action on success', () => {
    requestMock(200,[]);
    const expectedActionTypes = [ 'put_employee_request', 'put_employee_success'];        
    return compareActionTypes(expectedActionTypes,store,genericActions.put(domains.EMPLOYEE,{})); 
  }); 
  // test('dispatch 2 actions for put action on failure', async () => {
  //   requestMock(400,[]);
  //   const expectedActionTypes = [ 'put_employee_request', 'put_employee_failure'];        
  //   await compareActionTypes(expectedActionTypes,store,genericActions.put(domains.EMPLOYEE,{})); 
  // }); 
  // POST
  test('dispatch 2 actions for post action on success', () => {
    requestMock(200,[]);
    const expectedActionTypes = [ 'post_employee_request', 'post_employee_success'];        
    return compareActionTypes(expectedActionTypes,store,genericActions.post(domains.EMPLOYEE,{})); 
  }); 
  // test('dispatch 2 actions for post action on failure', () => {
  //   requestMock(400,[]);
  //   const expectedActionTypes = [ 'post_employee_request', 'post_employee_failure'];        
  //   return compareActionTypes(expectedActionTypes,store,genericActions.post(domains.EMPLOYEE,{})); 
  // }); 
  // DELET
  test('dispatch 2 actions for delete action on success', () => {
    requestMock(200,[]);
    const expectedActionTypes = [ 'delete_employee_request', 'delete_employee_success'];        
    return compareActionTypes(expectedActionTypes,store,genericActions.delet(domains.EMPLOYEE,1)); 
  }); 
  // test('dispatch 2 actions for delete action on failure', async () => {
  //   requestMock(400,[]);
  //   const expectedActionTypes = [ 'delete_employee_request', 'delete_employee_failure'];        
  //   await compareActionTypes(expectedActionTypes,store,genericActions.delet(domains.EMPLOYEE,1)); 
  // }); 
});
