import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Formik } from 'formik';

import Employee from 'components/forms/Employee';

import { authoritySelectors, crewSelectors } from 'store/selectors';
import { employeeActions } from 'store/actions'

class EmployeeEditContainer extends Component {
  render() {
    const { authorities, crews, label, type, selected } = this.props;
    console.log(selected);
    if (type === "add") {
      return (
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            authorityId: -1,
            crewId: -1,
            pin: '',
            isEmployed: true,
            isWorking: false
          }}
          onSubmit={values => {
            const { createEmployee } = this.props;
            createEmployee({
              ...values,
              isEmployed: values.isEmployed ? 1 : 0,
              isWorking: values.isWorking ? 1 : 0,
            });
          }}
          render={formikProps => {
            return <Employee
              authorities={authorities}
              crews={crews}
              label={label}
              type={type}
              {...formikProps}
            />;
          }}
        />
      );
    } else {
      return (
        <Formik
          enableReinitialize
          initialValues={{ 
            ...selected,
            isEmployed: selected.isEmployed ? true : false,
            isWorking: selected.isWorking ? true : false
           }}
          onSubmit={values => {
            const { updateEmployee } = this.props;
            updateEmployee({
              ...values,
              isEmployed: values.isEmployed ? 1 : 0,
              isWorking: values.isWorking ? 1 : 0,
            });
          }}
          render={formikProps => {
            return <Employee
              authorities={authorities}
              crews={crews}
              label={label}
              type={type}
              {...formikProps}
            />;
          }}
        />
      );
    }

  }
}

const mapStateToProps = state => {
  return {
    crews: crewSelectors.getAllCrews(state),
    authorities: authoritySelectors.getAllAuthorities(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createEmployee: employee => {
      return dispatch(employeeActions.postEmployee(employee));
    },
    updateEmployee: employee => {
      return dispatch(employeeActions.putEmployee(employee));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEditContainer);