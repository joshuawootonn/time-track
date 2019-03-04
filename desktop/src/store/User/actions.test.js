import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import { userActions } from 'store/actions';
import { compareActionTypes } from 'helpers/test.helper';
import MockAdapter from 'axios-mock-adapter';

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
  // GET ALL THEM DATA
  test('login should dispatch 6 actions on Success', async () => {
    const expectedActionTypes = [
      'login_user_request',    
      'get_authorities_request',
      'get_authorities_success',  
      'get_crews_request', 
      'get_crews_success',
      'login_user_success'   
    ];   
    mock.onAny().reply(200,data);
    await compareActionTypes(expectedActionTypes,store,userActions.login());
  });
  test('getStaticData should dispatch 2 if network in one failure situation', async () => {
    const expectedActionTypes = [
      'login_user_request',          
      'login_user_failure'   
    ];   
    mock.onAny().reply(400,data);
    await compareActionTypes(expectedActionTypes,store,userActions.login());    
  });
});