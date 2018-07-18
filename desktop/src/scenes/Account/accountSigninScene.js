import React, { Component } from 'react';

import SigninContainer from 'containers/Account/SigninContainer';
import Signin from 'components/forms/AccountSigin';

class SigninScene extends Component {
  render() {
    console.log('siginin renders');
    return (
      <div>
        <SigninContainer />
      </div>
    );
  }
}

export default SigninScene;
