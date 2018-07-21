import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {shift as shiftActions} from 'store/actions';

import AccountActionForm from 'components/forms/AccountAction';

class AccountAction extends Component {
  back = () => {
    this.props.history.push('/');
  };
  clockIn = () => {
    const accountId = this.props.account.id;
    this.props.clockIn(accountId).then(() => {
      this.props.clockinSnack();
      this.props.history.push('/');
    });
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <AccountActionForm back={this.back} clockIn={this.clockIn} />
      </div>
    );
  }
}

AccountAction.propTypes = {
  history: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    clockIn: (employeeId) => {
      return dispatch(shiftActions.clockIn(employeeId));
    },
    clockinSnack: () => {
      return dispatch(shiftActions.clockInSnack());
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    account: state.account
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AccountAction));
