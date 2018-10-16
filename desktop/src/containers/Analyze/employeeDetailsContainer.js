import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Formik } from 'formik';
import {Typography} from '@material-ui/core';

import Employee from 'components/forms/Employee';
import { authoritySelectors, crewSelectors,employeeSelectors } from 'store/selectors';
import { employeeActions,analyzeActions } from 'store/actions';
import * as analyzeConstants from 'constants/analyze';
import Hero from 'components/layouts/Hero';

class EmployeeEditContainer extends Component {
  deleteEmployee = () => {
    const { selected, deleteEmployee } = this.props;  
    deleteEmployee(selected);
  };


  render() {


    const { authorities, crews, selected,selectEmployee,status } = this.props;

    // console.log('details: ',status,selected,selectEmployee);


    if(status === analyzeConstants.INIT){
      return (
        <Hero fullWidth fullHeight>
          <Typography variant="h6">Select an Employee.. </Typography>
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
    crews: crewSelectors.getAllCrews(state),
    authorities: authoritySelectors.getAllAuthorities(state),
    selected: employeeSelectors.getSelectedEmployee(state),
    status: state.analyze.employeeStatus    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createEmployee: employee => {
      return dispatch(employeeActions.postEmployee(employee));
    },
    updateEmployee: employee => {
      return dispatch(employeeActions.putEmployee(employee));
    },
    deleteEmployee: employee => {
      return dispatch(employeeActions.deleteEmployee(employee));
    },
    selectEmployee: employee => {
      return dispatch(analyzeActions.selectEmployee(employee));
    },
    setEmployeeStatus: status => {
      return dispatch(analyzeActions.setEmployeeStatus(status));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeEditContainer);
