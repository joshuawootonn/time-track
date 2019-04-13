import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Progress from 'components/helpers/Progress';
import AnalyzeToolbar from 'components/tables/Toolbar';

import { analyzeActions } from 'store/actions';
import { employeeSelectors } from 'store/selectors';

import { analyzeStatus } from 'constants/analyze';
import domain from 'constants/domains';

export class EmployeeIndex extends Component {   
  selectLabel = selected => `${selected.firstName} ${selected.lastName} selected`;

  add = () => {
    const { selected, select, setStatus } = this.props;
    if(selected && selected.id){
      select(domain.EMPLOYEE,selected.id);
    }
    setStatus(domain.EMPLOYEE,analyzeStatus.ADDING);
  } 
  
  render() {
    const { employees, selected, toggleEmployeeFilter,employeeFilterVisible } = this.props;
 
    if (!employees) return <Progress variant="circular" fullPage />;

    return (       
      <AnalyzeToolbar 
        selectLabel={this.selectLabel}
        label="Employees"
        add={this.add}
        selected={selected}
        toggleFilter={toggleEmployeeFilter}
        isFilterVisible={employeeFilterVisible}
      />                
    );
  }
}

EmployeeIndex.propTypes = {
  employees: PropTypes.array,
  selected: PropTypes.object,
  select: PropTypes.func,
  setStatus: PropTypes.func.isRequired,
  toggleEmployeeFilter: PropTypes.func,
  employeeFilterVisible: PropTypes.bool
};

/* istanbul ignore next */
const mapStateToProps = state => {

  const filters = state.analyze.employeeFilters;
  return {
    employeeFilterVisible: state.analyze.employeeFilterVisible,
    employees: employeeSelectors.getAllEmployeesNew(state, { filters , sorts: {} }),
    selected: employeeSelectors.getSelectedEmployee(state)
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ ...analyzeActions }, dispatch),    
    toggleEmployeeFilter: () => dispatch(analyzeActions.toggleFilter(domain.EMPLOYEE))  
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(EmployeeIndex);
