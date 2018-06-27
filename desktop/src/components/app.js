import React,{Component} from 'react';
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";


import SignInPage from './Auth/SignIn';
import HomePage from './Auth/Home';

import * as status from 'constants/status';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/auth" component={SignInPage} />
          <PrivateRoute
            user={this.props.user}
            path="/"
            component={HomePage}
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

export default connect(mapStateToProps)(App);

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

