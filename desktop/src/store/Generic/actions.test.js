import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { genericActions } from 'store/actions';
import { compareActionTypes } from 'helpers/test.helper';
import domains from 'constants/domains';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();
let mock;
const data = { response: true };

describe(`Generic Actions`, () => {
  beforeEach(() => {
    mock = new MockAdapter(axios);
    store.clearActions();
  });
  // GET ALL
  test(`dispatch 2 actions for getAll action on success`, () => {
    mock.onGet(/employees/).reply(200, data);
    const expectedActionTypes = [
      `get_employees_request`,
      `get_employees_success`
    ];
    return compareActionTypes(
      expectedActionTypes,
      store,
      genericActions.getAll(domains.EMPLOYEE)
    );
  });
  test(`dispatch 2 actions for getAll action on failure`, () => {
    mock.onGet(/employees/).reply(400, data);
    const expectedActionTypes = [
      `get_employees_request`,
      `get_employees_failure`
    ];
    return compareActionTypes(
      expectedActionTypes,
      store,
      genericActions.getAll(domains.EMPLOYEE)
    );
  });
  // GET
  test(`dispatch 2 actions for get action on success`, () => {
    mock.onGet(/employees/).reply(200, data);
    const expectedActionTypes = [
      `get_employee_request`,
      `get_employee_success`
    ];
    return compareActionTypes(
      expectedActionTypes,
      store,
      genericActions.get(domains.EMPLOYEE, 1)
    );
  });
  test(`dispatch 2 actions for get action on failure`, () => {
    mock.onGet(/employees/).reply(400, data);
    const expectedActionTypes = [
      `get_employee_request`,
      `get_employee_failure`
    ];
    return compareActionTypes(
      expectedActionTypes,
      store,
      genericActions.get(domains.EMPLOYEE, 1)
    );
  });
  // PUT
  test(`dispatch 2 actions for put action on success`, () => {
    mock.onPut(/employees/).reply(200, data);
    const expectedActionTypes = [
      `put_employee_request`,
      `put_employee_success`
    ];
    return compareActionTypes(
      expectedActionTypes,
      store,
      genericActions.put(domains.EMPLOYEE, {})
    );
  });
  test(`dispatch 2 actions for put action on failure`, async () => {
    mock.onPut(/employees/).reply(400, data);
    const expectedActionTypes = [
      `put_employee_request`,
      `put_employee_failure`
    ];
    await compareActionTypes(
      expectedActionTypes,
      store,
      genericActions.put(domains.EMPLOYEE, {})
    );
  });
  // POST
  test(`dispatch 2 actions for post action on success`, () => {
    mock.onPost(/employees/).reply(200, data);
    const expectedActionTypes = [
      `post_employee_request`,
      `post_employee_success`
    ];
    return compareActionTypes(
      expectedActionTypes,
      store,
      genericActions.post(domains.EMPLOYEE, {})
    );
  });
  test(`dispatch 2 actions for post action on failure`, () => {
    mock.onPost(/employees/).reply(400, data);
    const expectedActionTypes = [
      `post_employee_request`,
      `post_employee_failure`
    ];
    return compareActionTypes(
      expectedActionTypes,
      store,
      genericActions.post(domains.EMPLOYEE, {})
    );
  });
  // DELET
  test(`dispatch 2 actions for delete action on success`, () => {
    mock.onDelete(/employees/).reply(200, data);
    const expectedActionTypes = [
      `delete_employee_request`,
      `delete_employee_success`
    ];
    return compareActionTypes(
      expectedActionTypes,
      store,
      genericActions.delet(domains.EMPLOYEE, 1)
    );
  });
  test(`dispatch 2 actions for delete action on failure`, async () => {
    mock.onDelete(/employees/).reply(400, data);
    const expectedActionTypes = [
      `delete_employee_request`,
      `delete_employee_failure`
    ];
    await compareActionTypes(
      expectedActionTypes,
      store,
      genericActions.delet(domains.EMPLOYEE, 1)
    );
  });
});
