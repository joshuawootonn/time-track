import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { snackActions, employeeActions, analyzeActions } from 'store/actions';
import { employeeSelectors } from 'store/selectors';
import * as routes from 'constants/routes';
import AccountActionForm from 'components/forms/AccountAction';
import domains from 'constants/domains';
import IPCConstants from 'constants/ipc';

const electron = window.require(`electron`);
const ipcRenderer = electron.ipcRenderer;

export class AccountAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullScreen: true
    };
  }
  componentDidMount = () => {
    //REMOVE before deploy
    // this.props.history.push(`/${this.props.type}/${routes.ANALYZE}`);
    const isFullScreen = ipcRenderer.sendSync(IPCConstants.IS_FULLSCREEN, ``);
    this.setState({
      isFullScreen
    });
  }
  back = () => {
    this.props.history.push(`/`);
  };
  clockIn = () => {
    const { employees, employee, history } = this.props;
    const employeeToClockin = employees[employee.current.id];
    return this.props.clockIn(employeeToClockin).then(() => history.push(`/`));
  };
  clockOut = () => {
    this.props.history.push(`/${this.props.type}/${routes.CLOCKOUT}`);
  };
  analyze = () => {
    this.props.clearFilters();
    this.props.history.push(`/${this.props.type}/${routes.ANALYZE}`);
  };
  export = () => {
    this.props.history.push(`/${this.props.type}/${routes.EXPORT}`);
  };
  toggleFullscreen = () => {
    this.setState({
      isFullScreen: ipcRenderer.sendSync(IPCConstants.TOGGLE_FULLSCREEN, ``)
    });
  }
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
        toggleFullscreen={this.toggleFullscreen}
        isFullScreen={this.state.isFullScreen}
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
  currentEmployee: PropTypes.object.isRequired,
  clearFilters: PropTypes.func.isRequired
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    clockIn: employee => {
      return dispatch(employeeActions.clockIn(employee));
    },
    openSnack: (type, message) => {
      return dispatch(snackActions.openSnack(type, message));
    },
    clearFilters: () => {
      dispatch(analyzeActions.clearFilter(domains.EMPLOYEE));
      dispatch(analyzeActions.clearFilter(domains.PROJECT));
      dispatch(analyzeActions.clearFilter(domains.TASK));
      dispatch(analyzeActions.clearFilter(domains.SHIFT));
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountAction));
