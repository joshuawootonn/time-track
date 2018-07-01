import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from 'containers/auth/privateRouteContainer';
import UserAuthContainer from 'containers/auth/userAuthContainer';
import AccountActionScene from 'scenes/accountActionScene';
import SigninScene from 'scenes/signinScene';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/auth" component={UserAuthContainer} />
          <PrivateRoute path="/account" component={AccountActionScene} />
          <PrivateRoute path="/" component={SigninScene} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
