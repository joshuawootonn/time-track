import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import VirtualizedSortSelect from 'components/tables/VirtualizedSortSelect';
import Progress from 'components/helpers/Progress';

import { analyzeActions } from 'store/actions';
import { employeeSelectors } from 'store/selectors';

import * as TableDataTypes from 'constants/tableDataTypes';
import domain from 'constants/domains';

export class EmployeeIndex extends Component {  
  select = object => this.props.select(domain.EMPLOYEE,object)
  
  render() {
    const { employees, selected } = this.props;
   
    if (!employees) return <Progress variant="circular" fullPage />;

    return ( 
      <VirtualizedSortSelect
        data={employees || []}
        columns={rows} 
        selected={selected}
        select={this.select}
        initialSortBy="lastName"     
      />                
    );
  }
}

EmployeeIndex.propTypes = {
  employees: PropTypes.array,
  selected: PropTypes.object,
  select: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired
};

/* istanbul ignore next */
const mapStateToProps = state => {
  const filters = state.analyze.employeeFilters;
  return {
    employees: employeeSelectors.getAllEmployeesNew(state, { filters , sorts: {} }),
    selected: employeeSelectors.getSelectedEmployee(state)
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ ...analyzeActions }, dispatch)   
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(EmployeeIndex);

const rows = [
  {
    id: `firstName`,   
    dataKey: `firstName`, 
    width: 150, 
    height: 56,
    padding: `dense`,
    label: `First Name`,
    type: TableDataTypes.STRING
  },
  {
    id: `lastName`, 
    dataKey: `lastName`,   
    width: 150, 
    height: 56,
    padding: `dense`,
    label: `Last Name`,
    type: TableDataTypes.STRING
  },
  {
    id: `authority_type`,
    dataKey: `authority`, 
    width: 150, 
    height: 56,      
    padding: `dense`,
    label: `Authority`,
    type: TableDataTypes.OBJECT,
    keys: [`type`]
  },
  {
    id: `name`,  
    dataKey: `crew`,  
    width: 150, 
    height: 56,
    padding: `dense`,
    label: `Crew`,
    type: TableDataTypes.OBJECT,
    keys: [`name`]
  },
  {
    id: `isEmployed`,
    dataKey: `isEmployed`, 
    width: 120, 
    height: 56,
    align: `right`,
    padding: `dense`,
    label: `Currently Employed`,
    type: TableDataTypes.BOOLEAN
  },
  {
    id: `isWorking`,
    dataKey: `isWorking`, 
    width: 120, 
    height: 56,
    align: `right`,
    padding: `dense`,
    label: `Currently Working`,
    type: TableDataTypes.BOOLEAN
  }
];
