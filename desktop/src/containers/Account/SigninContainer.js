import React, { Component } from 'react'

import { Formik } from 'formik';

import AccountSigin from 'components/forms/AccountSigin';

class SignInContainer extends Component {
  render() {
    return (
      <Formik
        initialValues={{ pin: '' }}
        validate={values => { /*console.log(values) */ }}
        onSubmit={values => { 
          
        }}
        render={({ errors, touched, isSubmitting }) => 
          <AccountSigin
            errors={errors}
            touched={touched}
            isSubmitting={isSubmitting}
          />
        }
      />

    )
  }
}

export default SignInContainer