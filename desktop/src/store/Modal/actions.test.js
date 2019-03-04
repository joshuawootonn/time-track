import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { modalActions } from 'store/actions';
import { compareActionTypesSync } from 'helpers/test.helper';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();
describe('Modal Actions', () => {
  beforeEach(() => {
    store.clearActions();    
  });
  // SHOW
  test('openModal should dispatch the show_modal action', async () => {
    const expectedActionTypes = [ 'show_modal' ];
    await compareActionTypesSync(expectedActionTypes,store,modalActions.openModal('asdf',{}));
  });
  // HIDE
  test('closeModal should dispatch the hide_modal action', async () => {    
    const expectedActionTypes = [ 'hide_modal' ];
    await compareActionTypesSync(expectedActionTypes,store,modalActions.closeModal('asdf'));
  });
});