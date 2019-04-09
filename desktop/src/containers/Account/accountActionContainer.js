import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { snackActions, employeeActions } from 'store/actions';
import { employeeSelectors } from 'store/selectors';
import * as routes from 'constants/routes';
import AccountActionForm from 'components/forms/AccountAction';

export class AccountAction extends Component {
  componentDidMount = () => {
    //REMOVE before deploy
    // this.props.history.push(`/${this.props.type}/${routes.CLOCKOUT}`);
  }
  back = () => {
    this.props.history.push('/');
  };
  clockIn = () => {
    const { employees, employee, history } = this.props;
    const employeeToClockin = employees[employee.current.id];
    return this.props.clockIn(employeeToClockin).then(() => history.push('/'));
  };
  clockOut = () => {
    this.props.history.push(`/${this.props.type}/${routes.CLOCKOUT}`);
  };
  analyze = () => {
    this.props.history.push(`/${this.props.type}/${routes.ANALYZE}`);
  };
  export = () => {
    this.props.history.push(`/${this.props.type}/${routes.EXPORT}`);
  };
  render() {
    const { type, currentEmployee } = this.props;
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
  openSnack: PropTypes.func,
  clockIn: PropTypes.func,
  employees: PropTypes.object.isRequired,
  employee: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  currentEmployee: PropTypes.object.isRequired
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    clockIn: employee => {
      return dispatch(employeeActions.clockIn(employee));
    },
    openSnack: (type, message) => {
      return dispatch(snackActions.openSnack(type, message));
    }
  };
};

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    employee: state.employee,
    entities: state.entities,
    employees: employeeSelectors.getEmployeesFromEntities(state),
    currentEmployee: employeeSelectors.getCurrentEmployee(state)
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AccountAction));
