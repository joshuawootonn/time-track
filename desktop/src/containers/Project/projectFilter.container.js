import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import moment from 'moment';
import { Card } from '@material-ui/core';

import { subcategorySelectors,categorySelectors,taskSelectors } from 'store/selectors';
import { analyzeActions } from 'store/actions';
import ProjectForm from 'components/forms/Project';

import domain from 'constants/domains';

export class ProjectFilter extends Component {

  removeProject = () => {
    const { selected,removeProject } = this.props;
    removeProject(selected.id);
  }
  render () {
    const { projectFilters, projectFilterVisible, clearFilter } = this.props;
    
    if(projectFilterVisible){
      return (
        <Formik
          enableReinitialize
          initialValues={{
            ...projectFilters,        
            startTime: moment(projectFilters.startTime,`MM-DD-YY HH:mm:ss`).format(`YYYY-MM-DDTHH:mm`),
            endTime: moment(projectFilters.endTime,`MM-DD-YY HH:mm:ss`).format(`YYYY-MM-DDTHH:mm`)
          }}
          onSubmit={(values,formikFunctions) => {
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
                <ProjectForm 
                  type="filter"
                  label="Filter"
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
    projectFilters: state.analyze.projectFilters,
    projectFilterVisible: state.analyze.projectFilterVisible,
    categories: categorySelectors.getAllCategories(state),
    subcategories: subcategorySelectors.getAllSubcategories(state),
    tasks: taskSelectors.getAllTasksWithContent(state)   
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    updateFilter: filters => dispatch(analyzeActions.updateFilter(domain.PROJECT,filters)),
    clearFilter: () => dispatch(analyzeActions.clearFilter(domain.PROJECT))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ProjectFilter);