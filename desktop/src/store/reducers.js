import { combineReducers } from 'redux';

import user from './User/reducers';
import entities from './Normalizr/entitiesReducer'
import results from './Normalizr/resultsReducer'


const rootReducer = combineReducers({
  entities,
  results,
  user,
});
export default rootReducer;
