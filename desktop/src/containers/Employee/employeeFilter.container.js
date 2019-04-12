import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import { Card } from '@material-ui/core';

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
    const { authorities, crews, employeeFilters, employeeFilterVisible, clearFilter  } = this.props;
    
    if(employeeFilterVisible){
      return (
        <Formik
          enableReinitialize
          initialValues={{  ...employeeFilters }}
          onSubmit={(values, formikFunctions) => {
            this.props.updateFilter({ ...values });
            formikFunctions.resetForm();          
          }}
          render={formikProps => {
            return (            
              <Card style={{ position: `absolute`, top: `70px`, left: `2.5%`, zIndex: 900, width: `95%`, minHeight: `100px` }}>
                <Employee
                  authorities={[{ id: -1, type: `All` }, ...authorities]}
                  crews={[{ id: -1, name: `All` }, ...crews ]}
                  label="Filter"
                  type="filter"
                  clearFilter={clearFilter}
                  {...formikProps}
                />
              </Card>          
            );
          }}
        />
      );
    }
    return null;
  }   
}

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    employeeFilters: state.analyze.employeeFilters,
    employeeFilterVisible: state.analyze.employeeFilterVisible,
    crews: crewSelectors.getAllCrews(state),
    authorities: authoritySelectors.getAllAuthorities(state)
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    updateFilter: filters => dispatch(analyzeActions.updateFilter(domain.EMPLOYEE,filters)),
    clearFilter: () => dispatch(analyzeActions.clearFilter(domain.EMPLOYEE))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(EmployeeFilter);
