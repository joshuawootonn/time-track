import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import { activityActions } from 'store/actions';
import { compareActionTypes } from 'helpers/test.helper';
import MockAdapter from 'axios-mock-adapter';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();
let mock;
const data = { response: true };
describe('Activity Actions', () => {
  beforeEach(() => {
    store.clearActions();    
    mock = new MockAdapter(axios);
  });
  // CREATE
  test('dispatch 5 actions for createActivity', async () => {
    const expectedActionTypes = [
      'create_activity_request',
      'post_activity_request',
      'post_activity_success',
      'show_snack',
      'create_activity_success'
    ];
    mock.onPost(/activities/).reply(200, data);  
    await compareActionTypes(expectedActionTypes,store,activityActions.createActivity({ id: 1 }));
  });
  test('dispatch 5 actions for createActivity', async () => {
    const expectedActionTypes = [
      'create_activity_request',
      'post_activity_request',
      'post_activity_failure',
      'show_snack',
      'create_activity_failure'
    ];
    mock.onPost(/activitiess/).reply(400, data); 
    await compareActionTypes(expectedActionTypes,store,activityActions.createActivity({ id: 1 }));
  });
});