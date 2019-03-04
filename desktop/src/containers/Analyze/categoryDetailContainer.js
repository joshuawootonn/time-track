import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import { Typography } from '@material-ui/core';

import Category from 'components/forms/Category';
import { categorySelectors } from 'store/selectors';
import { categoryActions } from 'store/actions';
import { analyzeStatus } from 'constants/analyze';
import Hero from 'components/layouts/Hero';
import { categoryValidation } from 'constants/formValidation';

export class CategoryDetail extends Component {
  
  removeCategory = () => {
    const { selected, removeCategory } = this.props;  
    removeCategory(selected.id);
  };

  render() {
    const { selected,status } = this.props;

    if(status === analyzeStatus.INIT){
      return (
        <Hero fullWidth fullHeight>
          <Typography variant="h6">Select a Category.. </Typography>
        </Hero>
      );
    }
            
    if(status === analyzeStatus.ADDING ){
      return (
        <Formik
          enableReinitialize
          initialValues={{
            type: ''
          }}
          validationSchema={categoryValidation}
          onSubmit={(values, formikFunctions) => {
            const { createCategory } = this.props;           
            return createCategory({
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
      
    if(status === analyzeStatus.EDITING){
      return (
        <Formik
          enableReinitialize
          initialValues={{
            ...selected
          }}          
          validationSchema={categoryValidation}
          onSubmit={(values,formikFunctions) => {
            const { updateCategory } = this.props;
            return updateCategory({
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
                removeCategory={this.removeCategory}
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

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    categories: categorySelectors.getAllCategories(state),
    selected: categorySelectors.getSelectedCategory(state),
    status: state.analyze.categoryStatus    
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    createCategory: category => {
      return dispatch(categoryActions.createCategory(category));
    },
    updateCategory: category => {
      return dispatch(categoryActions.updateCategory(category));
    },
    removeCategory: category => {
      return dispatch(categoryActions.removeCategory(category));
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(CategoryDetail);
