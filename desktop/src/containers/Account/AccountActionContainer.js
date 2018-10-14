import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { snackActions, employeeActions } from 'store/actions';
import { employeeSelectors } from 'store/selectors';
import * as routes from 'constants/routes';

import AccountActionForm from 'components/forms/AccountAction';

class AccountAction extends Component {
  componentDidMount = () => {
    // REMOVE before deploy
    this.props.history.push(`/${this.props.type}/${routes.ANALYZE}`);
  }
  back = () => {
    this.props.history.push('/');
  };
  clockIn = () => {
    const { entities, employee, history } = this.props;
    const asdf = entities.employees[employee.current.id];

    this.props.clockIn(asdf).then(() => history.push('/'));
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
  account: PropTypes.object,
  openSnack: PropTypes.func,
  clockIn: PropTypes.func,
  entities: PropTypes.object.isRequired,
  employee: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  currentEmployee: PropTypes.object.isRequired
};

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
