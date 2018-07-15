import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Formik } from 'formik';

import * as routes from 'constants/routes';
//import {account as accountActions} from 'store/actions';
import * as accountActions from 'store/Account/action';

import AccountSigin from 'components/forms/AccountSigin';

class SignInContainer extends Component {
  render() {
    const { getAccountByPin, history } = this.props;
    console.log(this.props.history.location.pathname)
    return (
      <Formik
        initialValues={{ pin: '565656' }}
        validate={values => {
          console.log("validate", values)

          
        }}
        onSubmit={values => {
          getAccountByPin(values.pin)
            .then(() => {
              console.log("asdfasdfasdfasdfas",this.props.history.location.pathname)
              this.props.history.push('/actions')
              console.log("asdfasdfasdfasdfas",this.props.history.location.pathname)
              
            })
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

const mapDispatchToProps = dispatch => {
  return {
    getAccountByPin: (pin) => {
      return dispatch(accountActions.getAccountByPin(pin))
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(SignInContainer));