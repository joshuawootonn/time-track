import React, { Component } from 'react'

import { connect } from 'react-redux';
import { Formik } from 'formik';

import Employee from 'components/forms/Employee';

class EmployeeEditContainer extends Component {
  render () {
    return (
      <Formik 
        initialValues={{
          firstName: "",
          lastName: "",
          authorityId: "",
          crewId: "",
          isEmployeed: 1
        }}
        onSubmit={() => {
          console.log("TODO: onSubmit")
        }}
        render={formikProps => {
          return <Employee {...formikProps} />;
        }}
        />
    )
  }
}

export default EmployeeEditContainer