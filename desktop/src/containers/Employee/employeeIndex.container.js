import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { analyzeActions } from 'store/actions';
import { employeeSelectors } from 'store/selectors';
import Progress from 'components/helpers/Progress';
import * as TableDataTypes from 'constants/tableDataTypes';
import { analyzeStatus } from 'constants/analyze';
import domain from 'constants/domains';


import VirtualizedSortSelect from 'components/tables/VirtualizedSortSelect';
import AnalyzeToolbar from 'components/tables/toolbars/NewAnalyzeToolbar';


export class EmployeeIndex extends Component { 
  
  selectLabel = selected => `${selected.firstName} ${selected.lastName} selected`;

  select = object => this.props.select(domain.EMPLOYEE,object)

  add = () => {
    if(this.props.selected){
      this.props.select(domain.EMPLOYEE,this.props.selected.id);
    }
    this.props.setStatus(domain.EMPLOYEE,analyzeStatus.ADDING);
  } 
  
  render() {
    const { employees, selected } = this.props;
    // console.log(`employee analyze render`);

    // if employees is not defined or empty
    if (!employees) return <Progress variant="circular" fullPage />;

    return (   
      <div style={{ height: `calc(100% - 64px)` }}>        
        <AnalyzeToolbar 
          selectLabel={this.selectLabel}
          label="Employees"
          add={this.add}
          filters={{}}
          setFilters={() => {}}
          selected={selected}
        />
        <VirtualizedSortSelect
          data={employees || []}
          columns={rows} 
          selected={selected}
          select={this.select}
          initialSortBy="lastName"     
        />        
      </div>  
            
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

  const filters = { isEmployed: 1 };
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
