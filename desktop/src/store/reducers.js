import { combineReducers } from 'redux';

import user from './User/reducers';
import entities from './Normalizr/entitiesReducer';
import results from './Normalizr/resultsReducer';
import snack from './Snack/reducers';
import employee from './Employee/reducer';

const rootReducer = combineReducers({
  entities,
  results,
  user,
  snack,
  employee,
});
export default rootReducer;
