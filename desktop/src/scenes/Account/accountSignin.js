import React, { Component } from 'react'

import AccountSigin from 'components/forms/AccountSigin';

class SigninScene extends Component {
  render () {
    console.log(this.props.location);
    return (
      <div>
        <AccountSigin />
      </div>
    )
  }
}

export default SigninScene