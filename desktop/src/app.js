import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from 'routes/privateRoute';
import AuthSigninScene from 'scenes/Auth/authSignin';
import RouteWithSubRoutes from 'routes/routeWithSubRoutes';
import asdf from 'components/testing/asdf/asdf';

import routes from 'routes';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/auth" component={AuthSigninScene} />
          {/* <Route path={routes[0].path} exact={routes[0].exact} render */}

          {routes.map((route,i) => {
            return <RouteWithSubRoutes key={i} {...route} /> ;
          })}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;


