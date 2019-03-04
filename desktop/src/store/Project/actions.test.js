import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import { projectActions } from 'store/actions';
import { compareActionTypes } from 'helpers/test.helper';
import MockAdapter from 'axios-mock-adapter';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();
let mock;
const data = { response: true };

describe('Project Actions', () => {
  beforeEach(() => {
    store.clearActions();    
    mock = new MockAdapter(axios);
  });
  // GET ALL 
  test('getAllSubcategories should dispatch 2 actions on success', async () => {
    const expectedActionTypes = [
      'get_projects_request', 'get_projects_success'
    ];
    mock.onGet(/projects/).reply(200,data);
    await compareActionTypes(expectedActionTypes,store,projectActions.getAllProjects());
  }); 
  //UPDATE
  test('updateProject should dispatch 6 actions on success', async () => {
    const expectedActionTypes = [
      'update_project_request',
      'put_project_request',
      'put_project_success',
      'show_snack',
      'update_project_success'
    ];    
    mock.onGet().reply(200, []);  
    mock.onDelete(/projectTask/).reply(200,data);
    mock.onPut(/projects/).reply(200, { response: true, id: 1 });  
    await compareActionTypes(expectedActionTypes,store,projectActions.updateProject({ id: 1,projectTasks: [] }));
  });
  test('updateProject should dispatch 6 actions on success plus 2 for deleting existing projectTasks', async () => {
    const expectedActionTypes = [
      'update_project_request',
      'put_project_request',
      'put_project_success', 
      'put_project_task_request',
      'put_project_task_success',
      'show_snack',
      'update_project_success' 
    ];    
    mock.onGet().reply(200, [{ id: 1 }]);  
    mock.onDelete(/projectTask/).reply(200,data);
    mock.onPut(/project/).reply(200, { response: true, id: 1 });  
    await compareActionTypes(expectedActionTypes,store,projectActions.updateProject({ id: 1,projectTasks: [{ id: 1,projectId: 1 }] }));
  });
  test('updateProject should dispatch 5 actions on success plus 2 for deleting existing projectTasks and 2 for putting new ones', async () => {
    const expectedActionTypes = [
      'update_project_request',
      'put_project_request', 
      'put_project_success', 
      'delete_project_task_request',
      'delete_project_task_success',
      'put_project_task_request',
      'put_project_task_success',
      'show_snack',
      'update_project_success' 
    ];    
    mock.onGet().reply(200, [{ id: 2 }]);  
    mock.onDelete().reply(200,data);
    mock.onPut(/project/).reply(200, { response: true, id: 1 });  
    await compareActionTypes(expectedActionTypes,store,projectActions.updateProject({ id: 1,projectTasks: [{ id: 1,projectId: 1 }] }));
  });
  test('updateProject should dispatch 6 actions on failure', async () => {
    const expectedActionTypes = [ 
      'update_project_request',
      'put_project_request',
      'put_project_failure',
      'show_snack',
      'update_project_failure'
    ];
    mock.onPut(/projects/).reply(400, data); 
    await compareActionTypes(expectedActionTypes,store,projectActions.updateProject({ id: 1 }));
  });
  // // CREATE
  test('createProject should dispatch 7 actions on success', async () => {
    const expectedActionTypes = [
      'create_project_request',
      'post_project_request',
      'post_project_success',
      'select_domain',
      'show_snack',
      'create_project_success'
    ];
    mock.onPost(/project/).reply(200, { response: true, id: 1 });  
    await compareActionTypes(expectedActionTypes,store,projectActions.createProject({ id: 1, projectTasks: [] }));
  });
  test('createProject should dispatch 7 actions on success plus two for each projectTask', async () => {
    const expectedActionTypes = [
      'create_project_request',
      'post_project_request',
      'post_project_success',
      'post_project_task_request',
      'post_project_task_success',
      'post_project_task_request',
      'post_project_task_success',      
      'select_domain',
      'show_snack',
      'create_project_success'
    ];
    mock.onPost().reply(200, { response: true, id: 1 });  
    await compareActionTypes(expectedActionTypes,store,projectActions.createProject({ id: 1, projectTasks: [{ id: 1,projectId: 1 },{ id: 2 ,projectId: 1 }] }));
  });
  test('createProject should dispatch 6 actions on failure', async () => {
    const expectedActionTypes = [
      'create_project_request',
      'post_project_request',
      'post_project_failure',
      'show_snack',
      'create_project_failure'
    ];
    mock.onPost(/projects/).reply(400, data); 
    await compareActionTypes(expectedActionTypes,store,projectActions.createProject({ id: 1 }));
  });
  // // REMOVE
  test('removeProject should dispatch 6 actions on success', async () => {
    const expectedActionTypes = [
      'remove_project_request',
      'delete_selected',
      'delete_project_request',
      'delete_project_success',
      'show_snack',
      'remove_project_success'
    ];
    mock.onDelete(/projects/).reply(200, { response: true, id: 1 }); 
    await compareActionTypes(expectedActionTypes,store,projectActions.removeProject(1));
  });
  test('removeProject should dispatch 6 actions on failure', async () => {
    const expectedActionTypes = [
      'remove_project_request',
      'delete_selected',
      'delete_project_request',
      'delete_project_failure',
      'show_snack',
      'remove_project_failure'
    ];
    mock.onDelete(/projects/).reply(400, data); 
    await compareActionTypes(expectedActionTypes,store,projectActions.removeProject(1));
  });
 
});

