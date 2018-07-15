import React, { Component } from 'react'

import SigninContainer from 'containers/Account/SigninContainer';
import Signin from 'components/forms/AccountSigin'

class SigninScene extends Component {
  render () {
    return (
      <div>
        <SigninContainer />
      </div>
    )
  }
}

export default SigninScene