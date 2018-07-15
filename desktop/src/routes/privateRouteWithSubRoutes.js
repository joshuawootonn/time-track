import React from 'react';
import PrivateRoute from './privateRoute';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import * as status from 'constants/status';
import * as actions from 'store/User/action';
import { connect } from 'react-redux';

export const RouteWithSubRoutes = (props) => {
  
  const { path, exact, user, routes } = props;

  const Component = props.component;

  return (
    <Route
      path={path}
      exact={exact}
      render={routeProps => 
       user.status === status.SUCCESS ? (
          <Component routes={props.routes}  />          
        ) : (
          <Redirect
            to={{ pathname: '/auth', state: { from: routeProps.location } }}
          />
        ) 
      }
      />
  )
};


const mapStateToProps = state => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, actions)(RouteWithSubRoutes);