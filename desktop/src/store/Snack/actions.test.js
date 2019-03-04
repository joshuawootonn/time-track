import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { snackActions } from 'store/actions';
import { compareActionTypesSync } from 'helpers/test.helper';
import * as status from 'constants/status';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();
describe('Snack Actions', () => {
  beforeEach(() => {
    store.clearActions();    
  });
  // SHOW
  test('openSnack should dispatch the show_snack action', async () => {
    const expectedActionTypes = [ 'show_snack' ];
    await compareActionTypesSync(expectedActionTypes,store,snackActions.openSnack(status.SUCCESS,'asdf'));
  });
  // HIDE
  test('closeSnack should dispatch the hide_snack action', async () => {    
    const expectedActionTypes = [ 'hide_snack' ];
    await compareActionTypesSync(expectedActionTypes,store,snackActions.closeSnack());
  });
});