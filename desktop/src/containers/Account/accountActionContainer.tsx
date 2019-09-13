import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { snackActions, employeeActions, analyzeActions } from 'store/actions';
import { employeeSelectors } from 'store/selectors';
import * as routes from 'constants/routes';
import AccountActionForm from 'components/forms/AccountAction';
import domains from 'constants/domains';
import IPCConstants from 'constants/ipc';
import { BaseEmployee } from 'store/types';
import { AUTH_LEVELS } from 'constants/routes';

//@ts-ignore
const { ipcRenderer } = window.require('electron');

interface Props extends RouteComponentProps {
  clockIn: (employee: BaseEmployee) => Promise<any>;
  employees: BaseEmployee[];
  employee: any;
  type: AUTH_LEVELS;
  currentEmployee: BaseEmployee;
  clearFilters: () => void;
}

interface State {
  isFullScreen: boolean;
  isLoading: boolean;
}

export class AccountAction extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
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
  };
  back = () => {
    this.props.history.push(`/`);
  };
  clockIn = () => {
    const { isLoading } = this.state;
    const { employees, employee, history } = this.props;
    if (isLoading) {
      return;
    }
    const employeeToClockin = employees[employee.current.id];

    this.setState({ isLoading: true });
    return this.props.clockIn(employeeToClockin).then(() => {
      history.push(`/`);
      this.setState({ isLoading: false });
    });
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
        toggleFullscreen={this.toggleFullscreen}
        isFullScreen={this.state.isFullScreen}
      />
    );
  }
}

/* istanbul ignore next */
const mapDispatchToProps = (dispatch: any) => {
  return {
    clockIn: (employee: BaseEmployee) => {
      return dispatch(employeeActions.clockIn(employee));
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
const mapStateToProps = (state: any) => {
  return {
    employee: state.employee,
    entities: state.entities,
    employees: employeeSelectors.getEmployeesFromEntities(state),
    currentEmployee: employeeSelectors.getCurrentEmployee(state)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AccountAction));
