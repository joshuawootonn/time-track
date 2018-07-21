import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import PrivateRoute from 'routes/privateRoute';
import AuthSigninScene from 'scenes/Auth/authSigninScene';
import RouteWithSubRoutes from 'routes/routeWithSubRoutes';

import SnackRootContainer from 'containers/Snack/snackRootContainer'

import routes from 'routes';

const AuthedRoutes = () => (
  <div>
    <SnackRootContainer />
    {routes.map((route, i) => {
      return <RouteWithSubRoutes key={i} {...route} />;
    })}
  </div>
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/auth" component={AuthSigninScene} />
          <PrivateRoute path="/" component={AuthedRoutes} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
