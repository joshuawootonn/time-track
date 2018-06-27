import React,{Component} from 'react';
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";


import SignInPage from 'auth/SignIn';
import AuthedRoutes from 'auth/AuthedRoutes';

import * as status from 'constants/status';

class Auth extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/auth" component={SignInPage} />
          <PrivateRoute
            user={this.props.user}
            path="/"
            component={AuthedRoutes}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Auth);

function PrivateRoute({ component: Component, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        user.status === status.SUCCESS
          ? <Component {...props} />
          : <Redirect
              to={{ pathname: "/auth", state: { from: props.location } }}
            />}
    />
  );
}

