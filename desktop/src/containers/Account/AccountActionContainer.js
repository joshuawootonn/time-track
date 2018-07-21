import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {shift as shiftActions} from 'store/actions';
import {snack as snackActions} from 'store/actions';
import * as status from 'constants/status';

import AccountActionForm from 'components/forms/AccountAction';

class AccountAction extends Component {
  back = () => {
    this.props.history.push('/');
  };
  clockIn = () => {
    const accountId = this.props.account.id;
    this.props.clockIn(accountId)
    .then(() => {
      this.props.openSnack(status.SUCCESS,"Clocked in Success!");
      this.props.history.push('/');
    })
    .catch(() => {
      this.props.openSnack(status.FAILURE,"Clock in failed!");
      this.props.history.push('/')
    })
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
    openSnack: (type,message) => {
      return dispatch(snackActions.openSnack(type,message));
    }

  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    account: state.account
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AccountAction));
