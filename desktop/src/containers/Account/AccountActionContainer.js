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
    this.props.clockIn();
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
    clockIn: () => {
      dispatch(shiftActions.clockIn())
    }
  }
}


export default withRouter(connect(null,mapDispatchToProps)(AccountAction));
