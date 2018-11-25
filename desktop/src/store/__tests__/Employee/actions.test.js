import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import axios from 'axios';
import { employeeActions } from 'store/actions';
import { compareActionTypes,requestMock } from 'helpers/test.helper';
var MockAdapter = require('axios-mock-adapter');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();


let mock;

describe('Employee Actions', () => {
  beforeEach(() => {
    moxios.install(axios);
    store.clearActions();    
    mock = new MockAdapter(axios);
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
  test('dispatch 4 actions for createEmployee', async () => {
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
  // REMOVE
  test('dispatch 4 actions for removeEmployee', async () => {
    const expectedActionTypes = [
      'remove_employee_request',
      'delete_selected',
      'delete_employee_request',
      'delete_employee_success',
      'show_snack',
      'remove_employee_success'
    ];
    requestMock(200,{});   
    await compareActionTypes(expectedActionTypes,store,employeeActions.removeEmployee(1));
  });
  test('dispatch 4 actions for removeEmployee', async () => {
    const expectedActionTypes = [
      'remove_employee_request',
      'delete_selected',
      'delete_employee_request',
      'delete_employee_failure',
      'show_snack',
      'remove_employee_failure'
    ];
    requestMock(400,{});
    await compareActionTypes(expectedActionTypes,store,employeeActions.removeEmployee(1));
  });
  // TOGGLE IS WORKING
  test('dispatch 4 actions for toggleIsWorking',async () => {
    const expectedActionTypes = [      
      'put_employee_request',
      'put_employee_success'
    ];
    requestMock(200,{});   
    await compareActionTypes(expectedActionTypes,store,employeeActions.toggleIsWorking({ id: 1 }));
  });
  test('dispatch 4 actions for toggleIsWorking', async () => {
    const expectedActionTypes = [
      'put_employee_request',
      'put_employee_failure'
    ];
    requestMock(404,{});  
    await compareActionTypes(expectedActionTypes,store,employeeActions.toggleIsWorking({ id: 1 }));
  });
  // CLOCK IN 
  test('dispatch 4 actions for clockIn',async () => {
    const expectedActionTypes = [      
      'clockin_employee_request',
      'post_shift_request',
      'post_shift_success',
      'put_employee_request',
      'put_employee_success',
      'show_snack',
      'clockin_employee_success'
    ];
    
    const data = { response: true };
    mock.onPut(/employees/).reply(200, data);
    mock.onPost(/shifts/).reply(200, data);    
    await compareActionTypes(expectedActionTypes,store,employeeActions.clockIn({ id: 1 }));
  });
  test('dispatch 4 actions for clockIn', async () => {
    const expectedActionTypes = [
      'clockin_employee_request',      
      'post_shift_request',
      'post_shift_failure',
      'show_snack',
      'clockin_employee_failure'
    ];
    mock.onPost(/shifts/).reply(404);    
    await compareActionTypes(expectedActionTypes,store,employeeActions.clockIn({ id: 1 }));
  });

  // CLOCK OUT
  // test('dispatch 4 actions for clockOut',async () => {
  //   const expectedActionTypes = [      
  //     'clockOut_employee_request',
  //     'put_shift_request',
  //     'put_shift_success',
  //     'show_snack',
  //     'clockOut_employee_success'
  //   ];
  //   requestMocks(200,{});   
  //   await compareActionTypes(expectedActionTypes,store,employeeActions.clockOut({ id: 1 },{},[],30));
  // });
  // test('dispatch 4 actions for clockOut', async () => {
  //   const expectedActionTypes = [
  //     'clockout_employee_request',      
  //     'put_shift_request',
  //     'put_shift_failure',
  //     'show_snack',
  //     'clockout_employee_failure'
  //   ];
  //   requestMock(404,{});  
  //   await compareActionTypes(expectedActionTypes,store,employeeActions.clockOut({ id: 1 },{},[],30));
  // });
  // CLOCK OUT
  // test('dispatch 4 actions for clockOut',async () => {
  //   const expectedActionTypes = [      
  //     'login_employee_request',
  //     'login_employee_success'
  //   ];
  //   requestMock(200,{});   
  //   await compareActionTypes(expectedActionTypes,store,employeeActions.clockOut(111111));
  // });
  // test('dispatch 4 actions for clockOut', async () => {
  //   const expectedActionTypes = [
  //     'login_employee_request',
  //     'login_employee_failure'
  //   ];
  //   requestMock(404,{});  
  //   await compareActionTypes(expectedActionTypes,store,employeeActions.clockOut(111111));
  // });
  // // LOGIN
  // test('dispatch 2 actions for login',async () => {
  //   const expectedActionTypes = [      
  //     'login_employee_request',
  //     'login_employee_success'
  //   ];
  //   requestMock(200,{});   
  //   await compareActionTypes(expectedActionTypes,store,employeeActions.login(111111));
  // });
  // test('dispatch 2 actions for login', async () => {
  //   const expectedActionTypes = [
  //     'login_employee_request',
  //     'login_employee_failure'
  //   ];
  //   requestMock(404,{});  
  //   await compareActionTypes(expectedActionTypes,store,employeeActions.login(111111));
  // });


});

