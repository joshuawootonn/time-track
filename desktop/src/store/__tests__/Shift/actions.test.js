import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import { shiftActions } from 'store/actions';
import { compareActionTypes } from 'helpers/test.helper';
import MockAdapter from 'axios-mock-adapter';
import moment from 'moment';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();
let mock;
const data = { response: true };

describe('User Actions', () => {
  beforeEach(() => {
    store.clearActions();    
    mock = new MockAdapter(axios);
  });
  // GET CURRENT SHIFT
  test('getCurrentShift should dispatch 2 actions on Success', async () => {
    const expectedActionTypes = [
      'get_current_shift_request',
      'get_current_shift_success'       
    ];   
    mock.onAny().reply(200,[]);
    await compareActionTypes(expectedActionTypes,store,shiftActions.getCurrentShift(1));
  });
  test('getCurrentShift should dispatch 2 actions on Failure', async () => {
    const expectedActionTypes = [
      'get_current_shift_request',
      'get_current_shift_failure'       
    ];   
    mock.onAny().reply(400,data);
    await compareActionTypes(expectedActionTypes,store,shiftActions.getCurrentShift(1));
  });
  // GET SHIFTS IN RANGE
  test('getShiftsInRange should dispatch 2 actions on Success', async () => {
    const expectedActionTypes = [
      'get_shifts_in_range_request',
      'get_shifts_in_range_success'       
    ];   
    mock.onAny().reply(200,[]);
    await compareActionTypes(expectedActionTypes,store,shiftActions.getShiftsInRange({},{}));
  });
  test('getShiftsInRange should dispatch 2 actions on Failure', async () => {
    const expectedActionTypes = [
      'get_shifts_in_range_request',
      'get_shifts_in_range_failure'       
    ];   
    mock.onAny().reply(400,[]);
    await compareActionTypes(expectedActionTypes,store,shiftActions.getShiftsInRange({},{}));
  });
  //CREATE SHIFT
  test('createShift should dispatch 8 actions plus 2 for each activity on Success', async () => {
    const expectedActionTypes = [
      'create_shift_request',
      'post_shift_request',
      'get_shift_request',
      'get_shift_success',
      'post_activity_request',
      'post_activity_success',
      'show_snack',
      'select_domain',
      'create_shift_success',
      'post_shift_success'     
    ];   
    let currentMoment =  moment().format('YYYY-MM-DD HH:mm:ss');
    mock.onAny().reply(200,[]);
    await compareActionTypes(expectedActionTypes,store,shiftActions.createShift({
      clockInDate: currentMoment,
      clockOutDate: currentMoment,
      employeeId: 1,
      lunch: 30,
      activities: [{ shiftId: 1 }]
    }));
  });
  test('createShift should dispatch 5 actions on Failure', async () => {
    const expectedActionTypes = [
      'create_shift_request',
      'post_shift_request',
      'show_snack',
      'create_shift_failure',
      'post_shift_failure'     
    ];   
    mock.onAny().reply(400,[]);
    await compareActionTypes(expectedActionTypes,store,shiftActions.createShift({}));
  });
  //UPDATE SHIFT
  test('updateShift should dispatch 5 actions on Failure', async () => {
    const expectedActionTypes = [
      'update_shift_request',
      'put_shift_request',
      'get_shift_request',
      'get_shift_success',
      'post_activity_request',
      'post_activity_success',
      'show_snack',
      'update_shift_success',
      'put_shift_success'     
    ];   
    let currentMoment =  moment().format('YYYY-MM-DD HH:mm:ss');
    mock.onAny().reply(200,[]);
    await compareActionTypes(expectedActionTypes,store,shiftActions.updateShift({
      clockInDate: currentMoment,
      clockOutDate: currentMoment,
      employeeId: 1,
      lunch: 30,
      activities: [{ shiftId: 1 }]
    }));
  });
  test('updateShift should dispatch 5 actions on Failure', async () => {
    const expectedActionTypes = [
      'update_shift_request',
      'put_shift_request',
      'show_snack',
      'update_shift_failure',
      'put_shift_failure'     
    ];   
    mock.onAny().reply(400,[]);
    await compareActionTypes(expectedActionTypes,store,shiftActions.updateShift({}));
  });

  // REMOVE SHIFT
  test('removeShift should dispatch 2 actions on Success', async () => {
    const expectedActionTypes = [
      'remove_shift_request',
      'delete_shift_request',
      'delete_shift_success',
      'delete_selected',
      'show_snack',
      'remove_shift_success'       
    ];   
    mock.onAny().reply(200,[]);
    const dispatch = jest.fn();
    const getState = jest.fn();
    await compareActionTypes(expectedActionTypes,store,shiftActions.removeShift(1)(dispatch,getState));
  });
  test('removeShift should dispatch 2 actions on Failure', async () => {
    const expectedActionTypes = [
      'remove_shift_request',
      'delete_selected',
      'show_snack',
      'remove_shift_failure'       
    ];   
    mock.onAny().reply(400,[]);
    await compareActionTypes(expectedActionTypes,store,shiftActions.removeShift(1));
  });
});