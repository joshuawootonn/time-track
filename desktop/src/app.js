import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from 'routes/privateRoute';
import UserAuthScene from 'scenes/Users/AuthScene';
import AccountActionScene from 'scenes/accountActionScene';
import SigninScene from 'scenes/signinScene';
import RouteWithSubRoutes from 'routes/routeWithSubRoutes';

import routes from 'routes';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/auth" component={UserAuthScene} />
          
          {routes.map((route,i) => {
            return <RouteWithSubRoutes key={i} {...route} /> ;
          })}

          {/* <PrivateRoute path="/account" component={AccountActionScene} />
          <PrivateRoute path="/" component={SigninScene} /> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
