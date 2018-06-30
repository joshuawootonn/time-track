import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import AccountActionsScene from 'scenes/accountActionsScene';
import SigninScene from 'scenes/signinScene';

class AuthedRoute extends Component {
  render() {
    const {location} = this.props;
    return <div>
      <Route path={location} component={AccountActionsScene} />
      <Route path={`${location}signin`} component={SigninScene} />
    </div>;
  }
}

export default AuthedRoute;
