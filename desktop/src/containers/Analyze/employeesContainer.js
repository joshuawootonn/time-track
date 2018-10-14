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

const EDITING = 'editing';
const ADDING = 'adding';
const INITIAL = 'initial';

class EmployeeContainer extends Component {
  state = {
    selected: {},
    status: INITIAL
  }

  componentDidMount = () => {
    this.props.getEmployees();
  }
  addEmployee = () => {
    this.setState({
      status: ADDING
    });
  }
  selectEmployee = employee => {
    if(employee === this.state.selected){
      this.setState({
        selected: {},
        status: INITIAL
      });
    }else{
      this.setState({
        selected: employee,
        status: EDITING
      });
    }
    
  }
  render() {
    const { employees } = this.props;
    const { selected, status } = this.state;
    
    const isLoading = !employees;
    if (isLoading) {
      return <Progress variant="circular" fullPage />;
    }
    return (
      <Grid container >
        <Grid item xs={7}>
          <SortSelectTable tableData={employees} headerData={rows} selected={selected} select={this.selectEmployee} add={this.addEmployee}/>
        </Grid>
        {status === INITIAL && <div>click on something</div>}
        {status === ADDING &&
          <Grid item xs={5}>
            <EmployeeEditContainer type="add" label="Add" />
          </Grid>
        }
        {status === EDITING &&
          <Grid item xs={5}>
            <EmployeeEditContainer type="edit" label="Edit" selected={selected} />
          </Grid>
        }

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