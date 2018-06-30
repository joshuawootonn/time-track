import React, { Component } from 'react';
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Unauthed from 'auth/appUnauthed';
import Authed from 'auth/appAuthed';
import * as actions from 'store/User/actions';
import * as status from 'constants/status';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class Auth extends Component {  
  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Route path="/auth" component={Unauthed} />
        <PrivateRoute
          user={this.props.user}
          path="/"
          component={Authed}
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

export default connect(mapStateToProps, actions)(Auth);

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

