import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import * as status from 'constants/status';
import * as actions from 'store/User/actions';
import { connect } from 'react-redux';

class PrivateRoute extends Component {
  render() {
    const { user } = this.props;
    const Component = this.props.component;
    return (
      <Route
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
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return { user: state.user };
};
export default connect(
  mapStateToProps,
  actions,
)(PrivateRoute);
