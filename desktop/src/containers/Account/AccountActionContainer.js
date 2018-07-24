import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  snack as snackActions,
  employee as employeeActions,
} from 'store/actions';
import { employee as employeeSelectors } from 'store/selectors';
import * as status from 'constants/status';

import AccountActionForm from 'components/forms/AccountAction';

class AccountAction extends Component {
  back = () => {
    this.props.history.push('/');
  };
  clockIn = () => {
    const { entities, employee } = this.props;
    const asdf = entities.employees[employee.current];
    this.props
      .clockIn(asdf)
      .then(() => {
        this.props.openSnack(status.SUCCESS, 'Clocked in Success!');
        this.props.history.push('/');
      })
      .catch(() => {
        this.props.openSnack(status.FAILURE, 'Clock in failed!');
        this.props.history.push('/');
      });
  };
  clockOut = () => {
    this.props.history.push(`/${this.props.type}/clockout`);
  }
  analyze = () => {
    this.props.history.push(`/${this.props.type}/analyze`);
  }
  export = () => {
    this.props.history.push(`/${this.props.type}/export`);
  } 
  render() {    
    const {type,currentEmployee} = this.props;
    return (
      <AccountActionForm
        isWorking={currentEmployee.isWorking}
        type={type}
        back={this.back}
        clockIn={this.clockIn}
        clockOut={this.clockOut}
        analyze={this.analyze}
        export={this.export}      
      />
    );
  }
}

AccountAction.propTypes = {
  history: PropTypes.object.isRequired,
  account: PropTypes.object,
  openSnack: PropTypes.func,
  clockIn: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
  return {
    clockIn: employee => {
      return dispatch(employeeActions.clockIn(employee));
    },
    openSnack: (type, message) => {
      return dispatch(snackActions.openSnack(type, message));
    },
  };
};

const mapStateToProps = state => {
  return {
    employee: state.employee,
    entities: state.entities,
    currentEmployee: employeeSelectors.getCurrentEmployee(state)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AccountAction),
);
