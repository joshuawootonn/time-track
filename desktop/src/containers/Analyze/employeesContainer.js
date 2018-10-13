import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Grid } from '@material-ui/core';

import { employeeActions } from 'store/actions';
import { employeeSelectors } from 'store/selectors';
import SortSelectTable from 'components/tables/SortSelect';
import Progress from 'components/helpers/Progress';
import * as TableDataTypes from 'constants/tableDataTypes';
import EmployeeEditContainer from 'containers/Analyze/employeeEditContainer';

class EmployeeContainer extends Component {
  state = {
    selected: {}
  }

  componentDidMount = () => {
    this.props.getEmployees();
  }
  selectEmployee = (employee) => {
    this.setState({selected: employee})
  }
  render() {
    const { employees } = this.props;
    const { selected } = this.state;
    const isLoading = !employees;
    if (isLoading) {
      return <Progress variant="circular" fullPage />;
    }
    return (
      <Grid container spacing={12}>
        <Grid item xs={6}>
          <SortSelectTable tableData={employees} headerData={rows} selected={selected} select={this.selectEmployee} />
        </Grid>
        <Grid item xs={6}>
          <EmployeeEditContainer selected={selected}/>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    employees: employeeSelectors.getAllEmployeesWithContents(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getEmployees: () => {
      return dispatch(employeeActions.getEmployees());
    }
  };
};

EmployeeContainer.propTypes = {
  employees: PropTypes.array.isRequired,
  getEmployees: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeContainer);


const rows = [
  { id: 'firstName', numeric: false, disablePadding: false, label: 'First Name', type: TableDataTypes.STRING },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name', type: TableDataTypes.STRING },
  { id: 'authority', numeric: false, disablePadding: false, label: 'Authority', type: TableDataTypes.OBJECT, key: 'type' },
  { id: 'crew', numeric: false, disablePadding: false, label: 'Crew', type: TableDataTypes.OBJECT, key: 'name' },
  { id: 'isEmployed', numeric: true, disablePadding: false, label: 'Currently Employed', type: TableDataTypes.BOOLEAN },
  { id: 'isWorking', numeric: true, disablePadding: false, label: 'Currently Working', type: TableDataTypes.BOOLEAN }
];