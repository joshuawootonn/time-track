import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import { Typography } from '@material-ui/core';

import Category from 'components/forms/Category';
import { subcategorySelectors } from 'store/selectors';
import {  subcategoryActions } from 'store/actions';
import * as analyzeConstants from 'constants/analyze';
import Hero from 'components/layouts/Hero';
import { subcategoryValidation } from 'constants/formValidation';

class EmployeeEditContainer extends Component {
  
  deleteSubcategory = () => {
    const { selected, deleteSubcategory } = this.props;  
    deleteSubcategory(selected);
  };

  render() {
    const { selected,status } = this.props;

    if(status === analyzeConstants.INIT){
      return (
        <Hero fullWidth fullHeight>
          <Typography variant="h6">Select a Subcategory.. </Typography>
        </Hero>
      );
    }
            
    if(status === analyzeConstants.ADDING ){
      return (
        <Formik
          enableReinitialize
          initialValues={{
            type: '',
            categoryId: -1
          }}
          validationSchema={subcategoryValidation}
          onSubmit={(values, formikFunctions) => {
            const { createSubcategory } = this.props;            
            createSubcategory({
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
          validationSchema={subcategoryValidation}
          onSubmit={(values,formikFunctions) => {
            const { updateSubcategory } = this.props;
            updateSubcategory({
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
    subcategories: subcategorySelectors.getAllSubcategories(state),
    selected: subcategorySelectors.getSelectedSubcategory(state),
    status: state.analyze.subcategoryStatus    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createSubcategory: subcategory => {
      return dispatch(subcategoryActions.postSubcategory(subcategory));
    },
    updateSubcategory: subcategory => {
      return dispatch(subcategoryActions.putSubcategory(subcategory));
    },
    deleteSubcategory: subcategory => {
      return dispatch(subcategoryActions.deleteSubcategory(subcategory));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeEditContainer);
