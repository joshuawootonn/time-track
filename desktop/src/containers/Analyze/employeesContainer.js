import React, { Component } from 'react'
import { connect } from 'react-redux';

import { employeeActions } from 'store/actions';
import {employeeSelectors } from 'store/selectors';
import SortSelectTable from 'components/tables/SortSelect';
import Progress from 'components/helpers/Progress';

class EmployeeContainer extends Component {
  componentDidMount = () => {
    this.props.getEmployees();
  }
  render() {
    const {employees} = this.props;
    const isLoading = !employees;
    if (isLoading) {
      return <Progress variant="circular" fullPage />;
    }
    return (
      <div>
        <SortSelectTable tableData={employees} headerData={rows} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    employees: employeeSelectors.getAllEmployees(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEmployees: () => {
      return dispatch(employeeActions.getEmployees())
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EmployeeContainer);

const rows = [
  { id: 'firstName', numeric: false, disablePadding: false, label: 'First Name' },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
  { id: 'authorityId', numeric: true, disablePadding: false, label: 'Authority' },
  { id: 'authorityId', numeric: true, disablePadding: false, label: 'Crew' },
  { id: 'isEmployed', numeric: true, disablePadding: false, label: 'Currently Employed' },
  { id: 'isWorking', numeric: true, disablePadding: false, label: 'Currently Working' },
];