import React, { Component } from 'react'

import { connect } from 'react-redux';
import { Formik } from 'formik';

import Employee from 'components/forms/Employee';

import { authoritySelectors, crewSelectors } from 'store/selectors';

class EmployeeEditContainer extends Component {
  render() {

    const { authorities, crews } = this.props;
    return (
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          authorityId: 1,
          crewId: 1,
          isEmployeed: 1
        }}
        onSubmit={() => {
          console.log("TODO: onSubmit")
        }}
        render={formikProps => {
          return <Employee
            authorities={authorities}
            crews={crews}
            {...formikProps}
          />;
        }}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    crews: crewSelectors.getAllCrews(state),
    authorities: authoritySelectors.getAllAuthorities(state)
  };
};

export default connect(mapStateToProps, null)(EmployeeEditContainer)