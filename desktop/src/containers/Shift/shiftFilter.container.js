import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import { Card } from '@material-ui/core';
import moment from 'moment';

import FilterShift from 'components/forms/Shift/Filter';
import { authoritySelectors, crewSelectors, employeeSelectors, projectSelectors } from 'store/selectors';
import { analyzeActions } from 'store/actions';

import domain from 'constants/domains';

export class ShiftFilter extends Component {  
  render() {
    const {  employees, projects, crews, authorities, shiftFilters, shiftFilterVisible, clearFilter  } = this.props;
    
    if(shiftFilterVisible){
      return (
        <Formik
          enableReinitialize
          initialValues={{
            ...shiftFilters,
            startTime: moment(shiftFilters.startTime,`MM-DD-YY HH:mm:ss`).format(`YYYY-MM-DDTHH:mm`),
            endTime: moment(shiftFilters.endTime,`MM-DD-YY HH:mm:ss`).format(`YYYY-MM-DDTHH:mm`)
          }}
          onSubmit={(values, formikFunctions) => {
            this.props.updateFilter({
              ...values,
              startTime: moment(values.startTime,`YYYY-MM-DDTHH:mm`).format(`MM-DD-YY HH:mm:ss`),
              endTime: moment(values.endTime,`YYYY-MM-DDTHH:mm`).format(`MM-DD-YY HH:mm:ss`)
            });
            formikFunctions.resetForm();          
          }}
          render={formikProps => {
            return (            
              <Card style={{ position: `absolute`, top: `70px`, left: `2.5%`, zIndex: 900, width: `95%`, minHeight: `100px` }}>
                <FilterShift
                  employees={[{ id: -1, type: `All` },...employees]}
                  authorities={[{ id: -1, type: `All` }, ...authorities]}
                  crews={[{ id: -1, name: `All` }, ...crews ]}
                  projects={[{ id: -1, name: `All` }, ...projects]}
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
    shiftFilters: state.analyze.shiftFilters,
    shiftFilterVisible: state.analyze.shiftFilterVisible,
    employees: employeeSelectors.getAllEmployees(state),
    projects: projectSelectors.getActiveProjects(state),
    crews: crewSelectors.getAllCrews(state),
    authorities: authoritySelectors.getAllAuthorities(state)
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    updateFilter: filters => dispatch(analyzeActions.updateFilter(domain.SHIFT,filters)),
    clearFilter: () => dispatch(analyzeActions.clearFilter(domain.SHIFT))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ShiftFilter);
