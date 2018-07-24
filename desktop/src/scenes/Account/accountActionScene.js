import React, { Component } from 'react';
import AccountActionContainer from 'containers/Account/accountActionContainer';

class AccountActionAction extends Component {
  render() {
    return (
      <AccountActionContainer type={this.props.type} />
    );
  }
}

export default AccountActionAction;
