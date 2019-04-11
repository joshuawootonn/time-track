import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Formik } from 'formik';

import Employee from 'components/forms/Employee';
import { authoritySelectors, crewSelectors } from 'store/selectors';
import { analyzeActions } from 'store/actions';

import domain from 'constants/domains';

export class EmployeeFilter extends Component {  
  removeEmployee = () => {
    const { selected, removeEmployee } = this.props;  
    removeEmployee(selected.id);
  };

  render() {
    const { authorities, crews,employeeFilters  } = this.props;
    
    return (
      <Formik
        enableReinitialize
        initialValues={{
          ...employeeFilters
        }}
        onSubmit={(values, formikFunctions) => {
          const { updateFilter } = this.props;
          updateFilter({
            ...values
          });
          formikFunctions.resetForm();          
        }}
        render={formikProps => {
          return (
            <Employee
              authorities={authorities}
              crews={crews}
              label="Filter"
              type="filter"
              {...formikProps}
            />
          );
        }}
      />
    );
  } 
      
    
  
}

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    employeeFilters: state.analyze.employeeFilters,
    crews: crewSelectors.getAllCrews(state),
    authorities: authoritySelectors.getAllAuthorities(state)
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    updateFilter: filters => dispatch(analyzeActions.updateFilter(domain.EMPLOYEE,filters))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(EmployeeFilter);
