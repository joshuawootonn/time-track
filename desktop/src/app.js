import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from 'containers/privateRouteContainer';
import UserAuthScene from 'scenes/Users/AuthScene';
import AccountActionScene from 'scenes/accountActionScene';
import SigninScene from 'scenes/signinScene';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/auth" component={UserAuthScene} />
          <PrivateRoute path="/account" component={AccountActionScene} />
          <PrivateRoute path="/" component={SigninScene} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
