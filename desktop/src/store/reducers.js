import { combineReducers } from 'redux';

import user from './User/reducers';
import entities from './Normalizr/entitiesReducer';
import results from './Normalizr/resultsReducer';
import account from './Account/reducer';
import snack from './Snack/reducers';

const rootReducer = combineReducers({
  entities,
  results,
  user,
  account,
  snack,
});
export default rootReducer;
