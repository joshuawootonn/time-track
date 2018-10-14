import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Formik } from 'formik';

import Employee from 'components/forms/Employee';

import { authoritySelectors, crewSelectors } from 'store/selectors';
import { employeeActions } from 'store/actions';

class EmployeeEditContainer extends Component {
  deleteEmployee = () => {
    const { selected, select, deleteEmployee } = this.props;
    if (selected === {} && selected === null) return null;

    deleteEmployee(selected).then(() => {
      select({});
    });
  }
  render() {
    const { authorities, crews, label, type, selected } = this.props;
    console.log(selected);
    if (type === 'add') {
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
          onSubmit={(values, { resetForm, setErrors, setSubmitting, setStatus }) => {
            const { createEmployee } = this.props;
            createEmployee({
              ...values,
              isEmployed: values.isEmployed ? 1 : 0,
              isWorking: values.isWorking ? 1 : 0
            }).then(() => {
              resetForm()
              setStatus({ success: true })
              console.log("wow");
            }).catch((e) => {
              console.log("asdf", e);
              setStatus({ success: false })
              setSubmitting(false)
              setErrors({ submit: e })
            })
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
              isWorking: values.isWorking ? 1 : 0
            });
          }}
          render={formikProps => {
            return <Employee
              deleteEmployee={this.deleteEmployee}
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
    },
    deleteEmployee: employee => {
      return dispatch(employeeActions.deleteEmployee(employee));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEditContainer);