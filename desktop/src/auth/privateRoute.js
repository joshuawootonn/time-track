import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import * as status from 'constants/status';

export default function PrivateRoute({ component: Component, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        user.status === status.SUCCESS ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/auth', state: { from: props.location } }}
          />
        )
      }
    />
  );
}
