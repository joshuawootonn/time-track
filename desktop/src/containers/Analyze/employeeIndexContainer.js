import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { employeeActions, analyzeActions } from 'store/actions';
import { employeeSelectors } from 'store/selectors';
import SortSelectTable from 'components/tables/SortSelect';
import Progress from 'components/helpers/Progress';
import * as TableDataTypes from 'constants/tableDataTypes';
import { analyzeStatus, analyzeDomain } from 'constants/analyze';

class EmployeeContainer extends Component {
  
  componentDidMount = () => {
    this.props.getEmployees();
  };

  render() {
    const { employees, selected, select,setStatus } = this.props;

    const isLoading = !employees;
    if (isLoading) {
      return <Progress variant="circular" fullPage />;
    }

    return (
      <SortSelectTable
        selectLabel={selected => {return `${selected.firstName} ${selected.lastName} selected`;}}
        label="Employees"
        tableData={employees}
        headerData={rows}
        selected={selected}
        select={object =>select(analyzeDomain.EMPLOYEE,object)}
        add={() => {setStatus(analyzeDomain.EMPLOYEE,analyzeStatus.ADDING);}}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    employees: employeeSelectors.getAllEmployeesWithContents(state),
    selected: employeeSelectors.getSelectedEmployee(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getEmployees: () => {
      return dispatch(employeeActions.getEmployees());
    },    
    ...bindActionCreators({ ...analyzeActions }, dispatch)   
  };
};

EmployeeContainer.propTypes = {
  employees: PropTypes.array.isRequired,
  getEmployees: PropTypes.func.isRequired,
  selected: PropTypes.object,
  selectEmployee: PropTypes.func.isRequired,
  setEmployeeStatus: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeContainer);

const rows = [
  {
    id: 'firstName',
    numeric: false,
    padding: 'dense',
    label: 'First Name',
    type: TableDataTypes.STRING
  },
  {
    id: 'lastName',
    numeric: false,
    padding: 'dense',
    label: 'Last Name',
    type: TableDataTypes.STRING
  },
  {
    id: 'authority',
    numeric: false,
    padding: 'dense',
    label: 'Authority',
    type: TableDataTypes.OBJECT,
    keys: ['type']
  },
  {
    id: 'crew',
    numeric: false,
    padding: 'dense',
    label: 'Crew',
    type: TableDataTypes.OBJECT,
    keys: ['name']
  },
  {
    id: 'isEmployed',
    numeric: true,
    padding: 'dense',
    label: 'Currently Employed',
    type: TableDataTypes.BOOLEAN
  },
  {
    id: 'isWorking',
    numeric: true,
    padding: 'dense',
    label: 'Currently Working',
    type: TableDataTypes.BOOLEAN
  }
];
