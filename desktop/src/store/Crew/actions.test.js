import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import { crewActions } from 'store/actions';
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
  test(`getAllCrews should dispatch 2 actions for success`, async () => {
    const expectedActionTypes = [
      `get_crews_request`, `get_crews_success`
    ];
    mock.onGet(/crews/).reply(200,data);
    await compareActionTypes(expectedActionTypes,store,crewActions.getAllCrews());
  });
  // EDIT AUTHORITIES MODAL 
  test(`editCrewsModal should dispatch 1 action for success`, () => {
    const expectedActionTypes = [`show_modal`];
    compareActionTypesSync(expectedActionTypes,store,crewActions.editCrewsModal());
  });
  // UPDATE
  test(`updateCrew should dispatch 5 actions for success`, async () => {
    const expectedActionTypes = [
      `update_crew_request`,
      `put_crew_request`,
      `put_crew_success`,
      `show_snack`,
      `update_crew_success`
    ];
    mock.onPut(/crews/).reply(200, data);  
    await compareActionTypes(expectedActionTypes,store,crewActions.updateCrew({ id: 1 }));
  });
  test(`updateCrew should dispatch 5 actions for failure`, async () => {
    const expectedActionTypes = [
      `update_crew_request`,
      `put_crew_request`,
      `put_crew_failure`,
      `show_snack`,
      `update_crew_failure`
    ];
    mock.onPut(/crews/).reply(400, data); 
    await compareActionTypes(expectedActionTypes,store,crewActions.updateCrew({ id: 1 }));
  });
});
