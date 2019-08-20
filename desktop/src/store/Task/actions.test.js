import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import { taskActions } from 'store/actions';
import { compareActionTypes } from 'helpers/test.helper';
import MockAdapter from 'axios-mock-adapter';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();
let mock;
const data = { response: true };

describe(`Task Actions`, () => {
  beforeEach(() => {
    store.clearActions();
    mock = new MockAdapter(axios);
  });
  // GET ALL
  test(`getAllTasks should dispatch 2 actions on success`, async () => {
    const expectedActionTypes = [`get_tasks_request`, `get_tasks_success`];
    mock.onGet(/tasks/).reply(200, data);
    await compareActionTypes(
      expectedActionTypes,
      store,
      taskActions.getAllTasks()
    );
  });
  // UPDATE
  test(`updateTask dispatch 6 actions on success`, async () => {
    const expectedActionTypes = [
      `update_task_request`,
      `put_task_request`,
      `put_task_success`,
      `show_snack`,
      `update_task_success`
    ];
    mock.onPut(/tasks/).reply(200, data);
    await compareActionTypes(
      expectedActionTypes,
      store,
      taskActions.updateTask({ id: 1 })
    );
  });
  test(`updateTask should dispatch 4 actions on failure`, async () => {
    const expectedActionTypes = [
      `update_task_request`,
      `put_task_request`,
      `put_task_failure`,
      `show_snack`,
      `update_task_failure`
    ];
    mock.onPut(/tasks/).reply(400, data);
    await compareActionTypes(
      expectedActionTypes,
      store,
      taskActions.updateTask({ id: 1 })
    );
  });
  // CREATE
  test(`createTask dispatch 6 actions on success`, async () => {
    const expectedActionTypes = [
      `create_task_request`,
      `post_task_request`,
      `post_task_success`,
      `show_snack`,
      `create_task_success`
    ];
    mock.onPost(/tasks/).reply(200, data);
    await compareActionTypes(
      expectedActionTypes,
      store,
      taskActions.createTask({ id: 1 })
    );
  });
  test(`createTask should dispatch 4 actions on failure`, async () => {
    const expectedActionTypes = [
      `create_task_request`,
      `post_task_request`,
      `post_task_failure`,
      `show_snack`,
      `create_task_failure`
    ];
    mock.onPost(/tasks/).reply(400, data);
    await compareActionTypes(
      expectedActionTypes,
      store,
      taskActions.createTask({ id: 1 })
    );
  });
  // REMOVE
  test(`removeTask should dispatch 6 actions on success`, async () => {
    const expectedActionTypes = [
      `remove_task_request`,
      `delete_selected`,
      `delete_task_request`,
      `delete_task_success`,
      `show_snack`,
      `remove_task_success`
    ];
    mock.onDelete(/tasks/).reply(200, data);
    await compareActionTypes(
      expectedActionTypes,
      store,
      taskActions.removeTask(1)
    );
  });
  test(`removeTask should dispatch 6 actions on failure`, async () => {
    const expectedActionTypes = [
      `remove_task_request`,
      `delete_selected`,
      `delete_task_request`,
      `delete_task_failure`,
      `show_snack`,
      `remove_task_failure`
    ];
    mock.onDelete(/tasks/).reply(400, data);
    await compareActionTypes(
      expectedActionTypes,
      store,
      taskActions.removeTask(1)
    );
  });
});
