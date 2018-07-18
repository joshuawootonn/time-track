import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Formik } from 'formik';

import * as accountActions from 'store/Account/action';
import AccountSigin from 'components/forms/AccountSigin';

class SignInContainer extends Component {
  render() {
    const { getAccountByPin, history } = this.props;
    return (
      <Formik
        initialValues={{ pin: '565656' }}
        validate={values => {
          console.log('validate', values);
        }}
        onSubmit={values => {
          getAccountByPin(values.pin).then(() => {
            history.push('/actions');
          });
        }}
        render={({ errors, touched, isSubmitting }) => (
          <AccountSigin
            errors={errors}
            touched={touched}
            isSubmitting={isSubmitting}
          />
        )}
      />
    );
  }
}

SignInContainer.propTypes = {
  getAccountByPin: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    getAccountByPin: pin => {
      return dispatch(accountActions.getAccountByPin(pin));
    },
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(SignInContainer),
);
