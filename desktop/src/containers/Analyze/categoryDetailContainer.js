import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import { Typography } from '@material-ui/core';

import Category from 'components/forms/Category';
import { authoritySelectors, crewSelectors,employeeSelectors, categorySelectors } from 'store/selectors';
import { employeeActions,authorityActions, crewActions, categoryActions } from 'store/actions';
import * as analyzeConstants from 'constants/analyze';
import Hero from 'components/layouts/Hero';
import { employeeValidation, categoryValidation } from 'constants/formValidation';

class EmployeeEditContainer extends Component {
  
  deleteCategory = () => {
    const { selected, deleteCategory } = this.props;  
    deleteCategory(selected);
  };

  render() {
    const { selected,status } = this.props;

    if(status === analyzeConstants.INIT){
      return (
        <Hero fullWidth fullHeight>
          <Typography variant="h6">Select a Category.. </Typography>
        </Hero>
      );
    }
            
    if(status === analyzeConstants.ADDING ){
      return (
        <Formik
          enableReinitialize
          initialValues={{
            type: ''
          }}
          validationSchema={categoryValidation}
          onSubmit={(values, formikFunctions) => {
            const { createCategory } = this.props;
            console.log(values);
            createCategory({
              ...values
            }).then(
              () => {
                formikFunctions.resetForm();
                formikFunctions.setStatus({ success: true });               
              },
              e => {
                formikFunctions.setStatus({ success: false });
                formikFunctions.setSubmitting(false);
                formikFunctions.setErrors({ submit: e });
              }
            );
          }}
          render={formikProps => {
            return (
              <Category
                label="Add"
                type="add"
                {...formikProps}
              />
            );
          }}
        />
      );
    } 
      
    if(status === analyzeConstants.EDITING){
      return (
        <Formik
          enableReinitialize
          initialValues={{
            ...selected
          }}          
          validationSchema={categoryValidation}
          onSubmit={(values,formikFunctions) => {
            const { updateCategory } = this.props;
            updateCategory({
              ...values
            }).then(
              () => {
                formikFunctions.resetForm();
                formikFunctions.setStatus({ success: true });                
              },
              e => {
                formikFunctions.setStatus({ success: false });
                formikFunctions.setSubmitting(false);
                formikFunctions.setErrors({ submit: e });
              }
            );
          }}
          render={formikProps => {
            return (
              <Category
                deleteCategory={this.deleteCategory}
                label="Edit"
                type="edit"
                {...formikProps}
              />
            );
          }}
        />
      );
    } 
  }
}

const mapStateToProps = state => {
  return {
    categories: categorySelectors.getAllCategories(state),
    selected: categorySelectors.getSelectedCategory(state),
    status: state.analyze.categoryStatus    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createCategory: category => {
      return dispatch(categoryActions.postCategory(category));
    },
    updateCategory: category => {
      return dispatch(categoryActions.putCategory(category));
    },
    deleteCategory: category => {
      return dispatch(categoryActions.deleteCategory(category));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeEditContainer);
