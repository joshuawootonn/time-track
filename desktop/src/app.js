import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import PrivateRoute from 'routes/privateRoute';
import AuthSigninScene from 'scenes/Auth/authSignin';
import RouteWithSubRoutes from 'routes/routeWithSubRoutes';

import SnackRootContainer from 'containers/Floaters/snackRootContainer';
import ModalRootContainer from 'containers/Floaters/modalRootContainer';

import routes from 'routes';

export const AuthedRoutes = () => (
  <div>
    <SnackRootContainer />
    <ModalRootContainer />
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
