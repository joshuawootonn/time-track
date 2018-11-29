import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import { subcategoryActions } from 'store/actions';
import { compareActionTypes,compareActionTypesSync } from 'helpers/test.helper';
import MockAdapter from 'axios-mock-adapter';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();
let mock;
const data = { response: true };

describe('Subcategory Actions', () => {
  beforeEach(() => {
    store.clearActions();    
    mock = new MockAdapter(axios);
  });
  // GET ALL 
  test('dispatch 2 actions for getAllSubcategories', async () => {
    const expectedActionTypes = [
      'get_subcategories_request', 'get_subcategories_success'
    ];
    mock.onGet(/subcategories/).reply(200,data);
    await compareActionTypes(expectedActionTypes,store,subcategoryActions.getAllSubcategories());
  });
  // EDIT SUBCATEGORIES MODAL 
  test('editSubcategoriesModal should dispatch 1 action for success', () => {
    const expectedActionTypes = ['show_modal'];
    compareActionTypesSync(expectedActionTypes,store,subcategoryActions.editSubcategoriesModal());
  });

  // UPDATE
  test('dispatch 4 actions for updateSubcategory', async () => {
    const expectedActionTypes = [
      'update_subcategory_request',
      'put_subcategory_request',
      'put_subcategory_success',
      'show_snack',
      'update_subcategory_success'
    ];
    mock.onPut(/subcategories/).reply(200, data);  
    await compareActionTypes(expectedActionTypes,store,subcategoryActions.updateSubcategory({ id: 1 }));
  });
  test('dispatch 4 actions for updateSubcategory', async () => {
    const expectedActionTypes = [
      'update_subcategory_request',
      'put_subcategory_request',
      'put_subcategory_failure',
      'show_snack',
      'update_subcategory_failure'
    ];
    mock.onPut(/subcategories/).reply(400, data); 
    await compareActionTypes(expectedActionTypes,store,subcategoryActions.updateSubcategory({ id: 1 }));
  });
  // CREATE
  test('dispatch 4 actions for createSubcategory', async () => {
    const expectedActionTypes = [
      'create_subcategory_request',
      'post_subcategory_request',
      'post_subcategory_success',
      'show_snack',
      'create_subcategory_success'
    ];
    mock.onPost(/subcategories/).reply(200, data);  
    await compareActionTypes(expectedActionTypes,store,subcategoryActions.createSubcategory({ id: 1 }));
  });
  test('dispatch 4 actions for createSubcategory', async () => {
    const expectedActionTypes = [
      'create_subcategory_request',
      'post_subcategory_request',
      'post_subcategory_failure',
      'show_snack',
      'create_subcategory_failure'
    ];
    mock.onPost(/subcategories/).reply(400, data); 
    await compareActionTypes(expectedActionTypes,store,subcategoryActions.createSubcategory({ id: 1 }));
  });
  // REMOVE
  test('dispatch 4 actions for removeSubcategory', async () => {
    const expectedActionTypes = [
      'remove_subcategory_request',
      'delete_selected',
      'delete_subcategory_request',
      'delete_subcategory_success',
      'show_snack',
      'remove_subcategory_success'
    ];
    mock.onDelete(/subcategories/).reply(200, data); 
    await compareActionTypes(expectedActionTypes,store,subcategoryActions.removeSubcategory(1));
  });
  test('dispatch 4 actions for removeSubcategory', async () => {
    const expectedActionTypes = [
      'remove_subcategory_request',
      'delete_selected',
      'delete_subcategory_request',
      'delete_subcategory_failure',
      'show_snack',
      'remove_subcategory_failure'
    ];
    mock.onDelete(/subcategories/).reply(400, data); 
    await compareActionTypes(expectedActionTypes,store,subcategoryActions.removeSubcategory(1));
  });
 
});

