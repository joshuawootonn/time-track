import React, { Component } from 'react';
import AccountActionContainer from 'containers/Account/accountActionContainer';

class AccountActionAction extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.name}
        <AccountActionContainer />
      </div>
    );
  }
}

export default AccountActionAction;
