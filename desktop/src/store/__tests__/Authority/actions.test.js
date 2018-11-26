import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import { authorityActions } from 'store/actions';
import { compareActionTypes,compareActionTypesSync } from 'helpers/test.helper';
import MockAdapter from 'axios-mock-adapter';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();
let mock;
const data = { response: true };

describe('Authority Actions', () => {
  beforeEach(() => {
    store.clearActions();    
    mock = new MockAdapter(axios);
  });
  // GET ALL 
  test('dispatch 2 actions for getAllAuthorities success', async () => {
    const expectedActionTypes = [
      'get_authorities_request', 'get_authorities_success'
    ];
    mock.onGet(/authorities/).reply(200,data);
    await compareActionTypes(expectedActionTypes,store,authorityActions.getAllAuthorities());
  });
  // EDIT AUTHORITIES MODAL 
  test('dispatch 1 action for editAuthoritiesModal', () => {
    const expectedActionTypes = ['show_modal'];
    compareActionTypesSync(expectedActionTypes,store,authorityActions.editAuthoritiesModal());
  });
  // UPDATE
  test('dispatch 5 actions for updateAuthority', async () => {
    const expectedActionTypes = [
      'update_authority_request',
      'put_authority_request',
      'put_authority_success',
      'show_snack',
      'update_authority_success'
    ];
    mock.onPut(/authorities/).reply(200, data);  
    await compareActionTypes(expectedActionTypes,store,authorityActions.updateAuthority({ id: 1 }));
  });
  test('dispatch 5 actions for updateAuthority failure', async () => {
    const expectedActionTypes = [
      'update_authority_request',
      'put_authority_request',
      'put_authority_failure',
      'show_snack',
      'update_authority_failure'
    ];
    mock.onPut(/authorities/).reply(400, data); 
    await compareActionTypes(expectedActionTypes,store,authorityActions.updateAuthority({ id: 1 }));
  });
});