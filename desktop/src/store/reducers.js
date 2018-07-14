import { combineReducers } from '../../../../../Users/jose5/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react-redux/node_modules/redux';

import user from './User/reducers';
import entities from './Normalizr/entitiesReducer'
import results from './Normalizr/resultsReducer'


const rootReducer = combineReducers({
  entities,
  results,
  user,
});
export default rootReducer;
