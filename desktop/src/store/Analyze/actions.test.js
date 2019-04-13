import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { analyzeActions } from 'store/actions';
import { compareActionTypesSync } from 'helpers/test.helper';
import domains from 'constants/domains';
import { analyzeActionTypes } from 'constants/actionTypeConstants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();


describe(`Analyze Actions`, () => {
  beforeEach(() => {
    store.clearActions();    
  });
  test(`dispatch 1 action for select`, () => {
    const expectedActionTypes = [`select_domain`];
    compareActionTypesSync(expectedActionTypes,store,analyzeActions.select(domains.EMPLOYEE,1));
  });
  test(`dispatch 1 action for select`, () => {
    const expectedActionTypes = [`set_domain_status`];
    compareActionTypesSync(expectedActionTypes,store,analyzeActions.setStatus(domains.EMPLOYEE,1));
  });
  test(`dispatch 1 action for editSettingModal`, () => {
    const expectedActionTypes = [`show_modal`];
    compareActionTypesSync(expectedActionTypes,store,analyzeActions.editSettingsModal());
  });
  test(`dispatch 1 action for updateFilter`, () => {
    const expectedActionTypes = [analyzeActionTypes.UPDATE_FILTERS];
    compareActionTypesSync(expectedActionTypes,store,analyzeActions.updateFilter(domains.EMPLOYEE,{}));
  });
  test(`dispatch 1 action for toggleFilter`, () => {
    const expectedActionTypes = [analyzeActionTypes.TOGGLE_FILTER];
    compareActionTypesSync(expectedActionTypes,store,analyzeActions.toggleFilter(domains.EMPLOYEE));
  });
  test(`dispatch 1 action for clearFilter`, () => {
    const expectedActionTypes = [analyzeActionTypes.CLEAR_FILTER];
    compareActionTypesSync(expectedActionTypes,store,analyzeActions.clearFilter(domains.EMPLOYEE));
  });
});