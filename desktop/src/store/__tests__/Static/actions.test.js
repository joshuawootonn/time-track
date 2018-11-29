import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import { staticActions } from 'store/actions';
import { compareActionTypes } from 'helpers/test.helper';
import MockAdapter from 'axios-mock-adapter';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();
let mock;
const data = { response: true };

describe('Static Actions', () => {
  beforeEach(() => {
    store.clearActions();    
    mock = new MockAdapter(axios);
  });
  // GET ALL THEM DATA
  test('getStaticData should dispatch 14 actions on Success', async () => {
    const expectedActionTypes = [
      'get_static_data_request',
      'get_categories_request',
      'get_categories_success',
      'get_dimensions_request',
      'get_dimensions_success',
      'get_subcategories_request',
      'get_project_tasks_request',
      'get_subcategories_success', 
      'get_projects_request',
      'get_project_tasks_success',
      'get_tasks_request',
      'get_projects_success',
      'get_static_data_success',
      'get_tasks_success'   
    ];   
    mock.onAny().reply(200,data);
    await compareActionTypes(expectedActionTypes,store,staticActions.getStaticData());
  });
  test('getStaticData should dispatch 4 if network in one failure situation', async () => {
    const expectedActionTypes = [
      'get_static_data_request',         
      'get_categories_request',
      'get_categories_failure',
      'get_static_data_failure'     
    ];   
    mock.onAny().reply(400,data);
    await compareActionTypes(expectedActionTypes,store,staticActions.getStaticData());    
  });
});