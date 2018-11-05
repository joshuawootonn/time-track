import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import { Typography } from '@material-ui/core';

import Employee from 'components/forms/Employee';
import { authoritySelectors, crewSelectors,employeeSelectors, categorySelectors } from 'store/selectors';
import { employeeActions,authorityActions, crewActions, categoryActions } from 'store/actions';
import * as analyzeConstants from 'constants/analyze';
import Hero from 'components/layouts/Hero';
import { employeeValidation } from 'constants/formValidation';

class EmployeeEditContainer extends Component {
  
  deleteEmployee = () => {
    const { selected, deleteEmployee } = this.props;  
    deleteEmployee(selected);
  };

  render() {
    const { authorities, crews, selected,status,editAuthoritiesModal,editCrewsModal } = this.props;

    if(status === analyzeConstants.INIT){
      return (
        <Hero fullWidth fullHeight>
          <Typography variant="h6">Select a Employee.. </Typography>
        </Hero>
      );
    }
            
    if(status === analyzeConstants.ADDING ){
      return (
        <Formik
          enableReinitialize
          initialValues={{
            firstName: '',
            lastName: '',
            authorityId: 1,
            crewId: 1,
            pin: '',
            isEmployed: true,
            isWorking: false
          }}
          validationSchema={employeeValidation}
          onSubmit={(values, formikFunctions) => {
            const { createEmployee } = this.props;
            createEmployee({
              ...values,
              isEmployed: values.isEmployed ? 1 : 0,
              isWorking: values.isWorking ? 1 : 0
            }).then(
              () => {
                formikFunctions.resetForm();
                formikFunctions.setStatus({ success: true });
                console.log('wow');
              },
              e => {
                console.log('asdf', e);
                formikFunctions.setStatus({ success: false });
                formikFunctions.setSubmitting(false);
                formikFunctions.setErrors({ submit: e });
              }
            );
          }}
          render={formikProps => {
            return (
              <Employee
                authorities={authorities}
                crews={crews}
                label="Add"
                type="add"
                editAuthorities={editAuthoritiesModal}
                editCrews={editCrewsModal}
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
            ...selected,
            isEmployed: selected.isEmployed ? true : false,
            isWorking: selected.isWorking ? true : false
          }}          
          validationSchema={employeeValidation}
          onSubmit={(values,formikFunctions) => {
            const { updateEmployee } = this.props;
            updateEmployee({
              ...values,
              isEmployed: values.isEmployed ? 1 : 0,
              isWorking: values.isWorking ? 1 : 0
            }).then(
              () => {
                formikFunctions.resetForm();
                formikFunctions.setStatus({ success: true });
                console.log('wow');
              },
              e => {
                console.log('asdf', e);
                formikFunctions.setStatus({ success: false });
                formikFunctions.setSubmitting(false);
                formikFunctions.setErrors({ submit: e });
              }
            );
          }}
          render={formikProps => {
            return (
              <Employee
                deleteEmployee={this.deleteEmployee}
                authorities={authorities}
                crews={crews}
                label="Edit"
                type="edit"
                editAuthorities={editAuthoritiesModal}
                editCrews={editCrewsModal}
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
