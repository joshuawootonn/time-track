import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import { Typography } from '@material-ui/core';

import Employee from 'components/forms/Employee';
import { authoritySelectors, crewSelectors,employeeSelectors } from 'store/selectors';
import { employeeActions,authorityActions, crewActions } from 'store/actions';
import { analyzeStatus } from 'constants/analyze';
import Hero from 'components/layouts/Hero';
import { employeeValidation } from 'constants/formValidation';

export class EmployeeDetail extends Component {  
  removeEmployee = () => {
    const { selected, removeEmployee } = this.props;  
    removeEmployee(selected.id);
  };

  render() {
    const { authorities, crews, selected,status,editAuthoritiesModal,editCrewsModal } = this.props;

    if(status === analyzeStatus.INIT){
      return (
        <Hero fullWidth fullHeight>
          <Typography variant="h6">Select a Employee.. </Typography>
        </Hero>
      );
    }
            
    if(status === analyzeStatus.ADDING ){
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
            return createEmployee({
              ...values,
              isEmployed: values.isEmployed ? 1 : 0,
              isWorking: values.isWorking ? 1 : 0
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
      
    if(status === analyzeStatus.EDITING){
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
            return updateEmployee({
              ...values,
              isEmployed: values.isEmployed ? 1 : 0,
              isWorking: values.isWorking ? 1 : 0
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
              <Employee
                removeEmployee={this.removeEmployee}
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

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    crews: crewSelectors.getAllCrews(state),
    authorities: authoritySelectors.getAllAuthorities(state),
    selected: employeeSelectors.getSelectedEmployee(state),
    status: state.analyze.employeeStatus    
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    createEmployee: employee => {
      return dispatch(employeeActions.createEmployee(employee));
    },
    updateEmployee: employee => {
      return dispatch(employeeActions.updateEmployee(employee));
    },
    removeEmployee: id => {
      return dispatch(employeeActions.removeEmployee(id));
    },
    editAuthoritiesModal: () => {
      return dispatch(authorityActions.editAuthoritiesModal());
    },
    editCrewsModal: () => {
      return dispatch(crewActions.editCrewsModal());
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(EmployeeDetail);
