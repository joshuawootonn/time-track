import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from 'store/reducers';

const middleware = [thunk];
export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
