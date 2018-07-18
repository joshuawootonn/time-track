import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './privateRoute';

export const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    exact={route.exact}
    render={props => <route.component {...props} routes={route.routes} />}
  />
);

export default RouteWithSubRoutes;
