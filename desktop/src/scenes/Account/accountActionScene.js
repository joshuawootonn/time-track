import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AccountActionContainer from 'containers/Account/accountActionContainer';

class AccountAction extends Component {
  render() {
    return <AccountActionContainer type={this.props.type} />;
  }
}

AccountAction.propTypes = {
  type: PropTypes.string.isRequired
};

export default AccountAction;
