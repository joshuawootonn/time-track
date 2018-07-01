import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
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
PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
  user: PropTypes.object.isRequired,
  location: PropTypes.string.isRequired,
};
