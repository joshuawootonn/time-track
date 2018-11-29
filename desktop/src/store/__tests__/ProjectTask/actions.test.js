import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import { projectTaskActions } from 'store/actions';
import { compareActionTypes } from 'helpers/test.helper';
import MockAdapter from 'axios-mock-adapter';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();
let mock;
const data = { response: true };

describe('ProjectTask Actions', () => {
  beforeEach(() => {
    store.clearActions();    
    mock = new MockAdapter(axios);
  });
  // GET ALL 
  test('getAllProjectTasks should dispatch 2 actions on success', async () => {
    const expectedActionTypes = [
      'get_project_tasks_request', 'get_project_tasks_success'
    ]; 
    mock.onGet(/project/).reply(200,data);
    await compareActionTypes(expectedActionTypes,store,projectTaskActions.getAllProjectTasks());
  });
  
  // UPDATE
  test('updateProjectTask should dispatch 6 actions on success', async () => {
    const expectedActionTypes = [
      'update_project_task_request',
      'put_project_task_request',
      'put_project_task_success',
      'show_snack',
      'update_project_task_success'
    ];
    mock.onPut(/project/).reply(200, data);  
    await compareActionTypes(expectedActionTypes,store,projectTaskActions.updateProjectTask({ id: 1 }));
  });
  test('updateProjectTask should dispatch 6 actions on failure', async () => {
    const expectedActionTypes = [
      'update_project_task_request',
      'put_project_task_request',
      'put_project_task_failure',
      'show_snack',
      'update_project_task_failure' 
    ];
    mock.onPut(/projectTasks/).reply(400, data); 
    await compareActionTypes(expectedActionTypes,store,projectTaskActions.updateProjectTask({ id: 1 }));
  });
  // CREATE
  test('createProjectTask should dispatch 6 actions on success', async () => {
    const expectedActionTypes = [
      'create_project_task_request',
      'post_project_task_request',
      'post_project_task_success',
      'show_snack',
      'create_project_task_success'
    ];
    mock.onPost(/project/).reply(200, data);  
    await compareActionTypes(expectedActionTypes,store,projectTaskActions.createProjectTask({ id: 1 }));
  });
  test('createProjectTask should dispatch 6 actions on failure', async () => {
    const expectedActionTypes = [
      'create_project_task_request',
      'post_project_task_request',
      'post_project_task_failure',
      'show_snack',
      'create_project_task_failure'
    ];
    mock.onPost(/project/).reply(400, data); 
    await compareActionTypes(expectedActionTypes,store,projectTaskActions.createProjectTask({ id: 1 }));
  });
  // REMOVE
  test('removeProjectTask should dispatch 6 actions on success', async () => {
    const expectedActionTypes = [
      'remove_project_task_request',
      'delete_selected',
      'delete_project_task_request',
      'delete_project_task_success',
      'show_snack',
      'remove_project_task_success'
    ];
    mock.onDelete(/project/).reply(200, data); 
    await compareActionTypes(expectedActionTypes,store,projectTaskActions.removeProjectTask(1));
  });
  test('removeProjectTask should dispatch 6 actions on failure', async () => {
    const expectedActionTypes = [
      'remove_project_task_request',
      'delete_selected',
      'delete_project_task_request',
      'delete_project_task_failure',
      'show_snack',
      'remove_project_task_failure'
    ];
    mock.onDelete(/project/).reply(400, data); 
    await compareActionTypes(expectedActionTypes,store,projectTaskActions.removeProjectTask(1));
  });
 
});

