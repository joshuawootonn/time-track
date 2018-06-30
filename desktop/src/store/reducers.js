import { combineReducers } from 'redux';

import user from './User/reducers';

const rootReducer = combineReducers({
  user,
});
export default rootReducer;
