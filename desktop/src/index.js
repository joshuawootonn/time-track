import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';

import reducer from 'store/reducers';
import './index.css';
const middleware = [thunk];
export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);


const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: { main: '#344955' },
    secondary: { main: '#faab1a' },
    action: { main: '#17262a' }
  }
});

console.log(theme);
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
