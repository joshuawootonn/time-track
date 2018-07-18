import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import AccountActionForm from 'components/forms/AccountAction';

class AccountAction extends Component {
  back = () => {
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <AccountActionForm back={this.back} />
      </div>
    );
  }
}

AccountAction.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(AccountAction);
