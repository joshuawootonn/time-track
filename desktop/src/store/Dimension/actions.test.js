import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import { dimensionActions } from 'store/actions';
import { compareActionTypes } from 'helpers/test.helper';
import MockAdapter from 'axios-mock-adapter';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();
let mock;
const data = { response: true };

describe('Dimension Actions', () => {
  beforeEach(() => {
    store.clearActions();    
    mock = new MockAdapter(axios);
  });
  // GET ALL 
  test('getAllDimensions should dispatch 2 actions for success', async () => {
    const expectedActionTypes = [
      'get_dimensions_request', 'get_dimensions_success'
    ];
    mock.onGet(/dimensions/).reply(200,data);
    await compareActionTypes(expectedActionTypes,store,dimensionActions.getAllDimensions());
  });
});