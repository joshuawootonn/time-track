import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from 'routes/privateRoute';
import AuthSigninScene from 'scenes/Auth/authSignin';
import PrivateRouteWithSubRoutes from 'routes/privateRouteWithSubRoutes';

import routes from 'routes';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/auth" component={AuthSigninScene} />
          
          {routes.map((route,i) => {
            return <PrivateRouteWithSubRoutes key={i} component={route.component} {...route} /> ;
          })}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
