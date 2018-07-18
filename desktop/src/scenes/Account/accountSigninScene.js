import React, { Component } from 'react';

import AccountSigninContainer from 'containers/Account/AccountSigninContainer';

class AccountSigninScene extends Component {
  render() {
    console.log('siginin renders');
    return (
      <div>
        <AccountSigninContainer />
      </div>
    );
  }
}

export default AccountSigninScene;
