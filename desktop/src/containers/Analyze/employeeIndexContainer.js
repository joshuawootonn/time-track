import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { analyzeActions,employeeActions } from 'store/actions';
import { employeeSelectors } from 'store/selectors';
import SortSelectTable from 'components/tables/SortSelect';
import Progress from 'components/helpers/Progress';
import * as TableDataTypes from 'constants/tableDataTypes';
import { analyzeStatus } from 'constants/analyze';
import domain from 'constants/domains';

export class EmployeeIndex extends Component {
  componentDidMount = () => {
    this.props.getAllEmployees();    
  };
  
  selectLabel = selected => `${selected.firstName} ${selected.lastName} selected`;

  select = object => this.props.select(domain.EMPLOYEE,object)

  add = () => this.props.setStatus(domain.EMPLOYEE,analyzeStatus.ADDING)
  
  render() {
    const { employees, selected } = this.props;

    // if employees is not defined or empty
    if (!employees) return <Progress variant="circular" fullPage />;

    return (
      <SortSelectTable
        selectLabel={this.selectLabel}
        label="Employees"
        tableData={employees || []}
        headerData={rows}
        selected={selected}
        select={this.select}
        add={this.add}
        initialOrderBy='lastName'
      />
    );
  }
}

EmployeeIndex.propTypes = {
  employees: PropTypes.array.isRequired,
  getAllEmployees: PropTypes.func.isRequired,
  selected: PropTypes.object,
  select: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired
};

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    employees: employeeSelectors.getAllEmployeesWithContents(state),
    selected: employeeSelectors.getSelectedEmployee(state)
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    getAllEmployees: () => {
      return dispatch(employeeActions.getAllEmployees());
    },
    ...bindActionCreators({ ...analyzeActions }, dispatch)   
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(EmployeeIndex);

const rows = [
  {
    id: 'firstName',    
    padding: 'dense',
    label: 'First Name',
    type: TableDataTypes.STRING
  },
  {
    id: 'lastName',    
    padding: 'dense',
    label: 'Last Name',
    type: TableDataTypes.STRING
  },
  {
    id: 'authority',    
    padding: 'dense',
    label: 'Authority',
    type: TableDataTypes.OBJECT,
    keys: ['type']
  },
  {
    id: 'crew',    
    padding: 'dense',
    label: 'Crew',
    type: TableDataTypes.OBJECT,
    keys: ['name']
  },
  {
    id: 'isEmployed',
    align: 'right',
    padding: 'dense',
    label: 'Currently Employed',
    type: TableDataTypes.BOOLEAN
  },
  {
    id: 'isWorking',
    align: 'right',
    padding: 'dense',
    label: 'Currently Working',
    type: TableDataTypes.BOOLEAN
  }
];
