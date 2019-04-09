import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import { categoryActions } from 'store/actions';
import { compareActionTypes,compareActionTypesSync } from 'helpers/test.helper';
import MockAdapter from 'axios-mock-adapter';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();
let mock;
const data = { response: true };

describe(`Category Actions`, () => {
  beforeEach(() => {
    store.clearActions();    
    mock = new MockAdapter(axios);
  });
  // GET ALL 
  test(`dispatch 2 actions for getAllCategories`, async () => {
    const expectedActionTypes = [
      `get_categories_request`, `get_categories_success`
    ];
    mock.onGet(/categories/).reply(200,data);
    await compareActionTypes(expectedActionTypes,store,categoryActions.getAllCategories());
  });
  test(`dispatch 1 action for editCategoriesModal`, () => {
    const expectedActionTypes = [`show_modal`];
    compareActionTypesSync(expectedActionTypes,store,categoryActions.editCategoriesModal());
  });
  // UPDATE
  test(`dispatch 4 actions for updateCategory`, async () => {
    const expectedActionTypes = [
      `update_category_request`,
      `put_category_request`,
      `put_category_success`,
      `show_snack`,
      `update_category_success`
    ];
    mock.onPut(/categories/).reply(200, data);  
    await compareActionTypes(expectedActionTypes,store,categoryActions.updateCategory({ id: 1 }));
  });
  test(`dispatch 4 actions for updateCategory`, async () => {
    const expectedActionTypes = [
      `update_category_request`,
      `put_category_request`,
      `put_category_failure`,
      `show_snack`,
      `update_category_failure`
    ];
    mock.onPut(/categories/).reply(400, data); 
    await compareActionTypes(expectedActionTypes,store,categoryActions.updateCategory({ id: 1 }));
  });
  // CREATE
  test(`dispatch 5 actions for createCategory`, async () => {
    const expectedActionTypes = [
      `create_category_request`,
      `post_category_request`,
      `post_category_success`,
      `show_snack`,
      `create_category_success`
    ];
    mock.onPost(/categories/).reply(200, data);  
    await compareActionTypes(expectedActionTypes,store,categoryActions.createCategory({ id: 1 }));
  });
  test(`dispatch 5 actions for createCategory`, async () => {
    const expectedActionTypes = [
      `create_category_request`,
      `post_category_request`,
      `post_category_failure`,
      `show_snack`,
      `create_category_failure`
    ];
    mock.onPost(/categories/).reply(400, data); 
    await compareActionTypes(expectedActionTypes,store,categoryActions.createCategory({ id: 1 }));
  });
  // REMOVE
  test(`dispatch 6 actions for removeCategory`, async () => {
    const expectedActionTypes = [
      `remove_category_request`,
      `delete_selected`,
      `delete_category_request`,
      `delete_category_success`,
      `show_snack`,
      `remove_category_success`
    ];
    mock.onDelete(/categories/).reply(200, data); 
    await compareActionTypes(expectedActionTypes,store,categoryActions.removeCategory(1));
  });
  test(`dispatch 6 actions for removeCategory`, async () => {
    const expectedActionTypes = [
      `remove_category_request`,
      `delete_selected`,
      `delete_category_request`,
      `delete_category_failure`,
      `show_snack`,
      `remove_category_failure`
    ];
    mock.onDelete(/categories/).reply(400, data); 
    await compareActionTypes(expectedActionTypes,store,categoryActions.removeCategory(1));
  });
});
