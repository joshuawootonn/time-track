import React from 'react';
import ReactDOM from 'react-dom';

import Auth from 'auth/auth';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';

import reducer from 'store/reducers';

const middleware = [thunk];
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

ReactDOM.render(
  <Provider store={store}>
    <Auth />
  </Provider>,
  document.getElementById('root')
);
