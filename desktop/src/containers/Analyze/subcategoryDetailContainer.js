import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import { Typography } from '@material-ui/core';

import Subcategory from 'components/forms/Subcategory';
import { subcategorySelectors,categorySelectors } from 'store/selectors';
import {  subcategoryActions } from 'store/actions';
import { analyzeStatus,analyzeDomain } from 'constants/analyze';
import Hero from 'components/layouts/Hero';
import { subcategoryValidation } from 'constants/formValidation';

class EmployeeEditContainer extends Component {
  
  deleteSubcategory = () => {
    const { selected, deleteSubcategory } = this.props;  
    deleteSubcategory(selected);
  };

  render() {
    const { selected,status,categories } = this.props;

    if(status === analyzeStatus.INIT){
      return (
        <Hero fullWidth fullHeight>
          <Typography variant="h6">Select a Subcategory.. </Typography>
        </Hero>
      );
    }
            
    if(status === analyzeStatus.ADDING ){
      return (
        <Formik
          enableReinitialize
          initialValues={{
            type: '',
            categoryId: -1,
            dimensionId: 1
          }}
          validationSchema={subcategoryValidation}
          onSubmit={(values, formikFunctions) => {
            const { createSubcategory } = this.props;            
            createSubcategory({
              ...values,
              category: undefined,
              dimension: undefined
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
              <Subcategory
                label="Add"
                type="add"
                categories={categories}
                {...formikProps}
              />
            );
          }}
        />
      );
    } 
      
    if(status === analyzeStatus.EDITING){
      return (
        <Formik
          enableReinitialize
          initialValues={{
            ...selected
          }}          
          validationSchema={subcategoryValidation}
          onSubmit={(values,formikFunctions) => {
            const { updateSubcategory } = this.props;
            console.log(values);
            updateSubcategory({
              ...values,
              category: undefined,
              dimension: undefined
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
              <Subcategory
                deleteSubcategory={this.deleteSubcategory}
                label="Edit"
                type="edit"
                categories={categories}
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
