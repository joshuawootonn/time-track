import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import { employeeActions } from 'store/actions';
import { compareActionTypes } from 'helpers/test.helper';
import MockAdapter from 'axios-mock-adapter';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();
let mock;
const data = { response: true };

describe('Employee Actions', () => {
  beforeEach(() => {
    store.clearActions();    
    mock = new MockAdapter(axios);
  });
  // GET ALL 
  test('dispatch 2 actions for getAllEmployees', async () => {
    const expectedActionTypes = [
      'get_employees_request', 'get_employees_success'
    ];
    mock.onGet(/employees/).reply(200,data);
    await compareActionTypes(expectedActionTypes,store,employeeActions.getAllEmployees());
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
    mock.onPut(/employees/).reply(200, data);  
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
    mock.onPut(/employees/).reply(400, data); 
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
    mock.onPost(/employees/).reply(200, data);  
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
    mock.onPost(/employees/).reply(400, data); 
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
    mock.onDelete(/employees/).reply(200, data); 
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
    mock.onDelete(/employees/).reply(400, data); 
    await compareActionTypes(expectedActionTypes,store,employeeActions.removeEmployee(1));
  });
  // TOGGLE IS WORKING
  test('dispatch 4 actions for toggleIsWorking',async () => {
    const expectedActionTypes = [      
      'put_employee_request',
      'put_employee_success'
    ];
    
    mock.onPut(/employees/).reply(200, data); 
    await compareActionTypes(expectedActionTypes,store,employeeActions.toggleIsWorking({ id: 1 }));
  });  
  // CLOCK IN 
  test('dispatch 7 actions for clockIn on success',async () => {
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
  test('dispatch 5 actions for clockIn on shift post failure', async () => {
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
  test('dispatch 7 actions for clockIn on employee put failure',async () => {
    const expectedActionTypes = [      
      'clockin_employee_request',
      'post_shift_request',
      'post_shift_success',
      'put_employee_request',
      'put_employee_failure',
      'show_snack',
      'clockin_employee_failure'
    ];   
    
    mock.onPost(/shifts/).reply(200, data);    
    mock.onPut(/employees/).reply(404, data);
    await compareActionTypes(expectedActionTypes,store,employeeActions.clockIn({ id: 1 }));
  });

  // CLOCK OUT
  test('dispatch 7 actions for clockOut on success',async () => {
    const expectedActionTypes = [      
      'clockout_employee_request',
      'put_shift_request',
      'put_shift_success',
      'put_employee_request',
      'put_employee_success',
      'show_snack',
      'clockout_employee_success'
    ];
    
    const data = { response: true };
    mock.onPut(/employees/).reply(200, data);
    mock.onPut(/shifts/).reply(200, data);    
    await compareActionTypes(expectedActionTypes,store,employeeActions.clockOut({ id: 1 },{},[],30));
  });
  test('dispatch 9 actions for clockOut on success with one activity',async () => {
    const expectedActionTypes = [      
      'clockout_employee_request',
      'post_activity_request',
      'put_shift_request',
      'post_activity_success',
      'put_shift_success',
      'put_employee_request',
      'put_employee_success',
      'show_snack',
      'clockout_employee_success'
    ];
    
    const data = { response: true };
    mock.onPut(/employees/).reply(200, data);
    mock.onPut(/shifts/).reply(200, data);    
    mock.onPost(/activit/).reply(200,data);
    await compareActionTypes(expectedActionTypes,store,employeeActions.clockOut({ id: 1 },{},[{ id: 1 }],30));
  });
  test('dispatch 5 actions for clockOut on shift put failure', async () => {
    const expectedActionTypes = [
      'clockout_employee_request',      
      'put_shift_request',
      'put_shift_failure',
      'show_snack',
      'clockout_employee_failure'
    ];
    mock.onPut(/shifts/).reply(404);    
    await compareActionTypes(expectedActionTypes,store,employeeActions.clockOut({ id: 1 },{},[],30));
  });
  test('dispatch 7 actions for clockOut on employee put failure',async () => {
    const expectedActionTypes = [      
      'clockout_employee_request',
      'put_shift_request',
      'put_shift_success',
      'put_employee_request',
      'put_employee_failure',
      'show_snack',
      'clockout_employee_failure'
    ];   
    
    mock.onPut(/shifts/).reply(200, data);    
    mock.onPut(/employees/).reply(404, data);
    await compareActionTypes(expectedActionTypes,store,employeeActions.clockOut({ id: 1 },{},[],30));
  });
  
  // LOGIN
  test('dispatch 2 actions for login',async () => {
    const expectedActionTypes = [      
      'login_employee_request',
      'login_employee_success'
    ];
    mock.onAny(/employees/).reply(200, data);
    await compareActionTypes(expectedActionTypes,store,employeeActions.login(111111));
  });
  test('dispatch 2 actions for login', async () => {
    const expectedActionTypes = [
      'login_employee_request',
      'login_employee_failure'
    ];
    mock.onAny(/employees/).reply(400, data);
    await compareActionTypes(expectedActionTypes,store,employeeActions.login(111111));
  });
});

