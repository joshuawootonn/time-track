import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Formik } from 'formik';

import { account as accountValidation } from 'constants/formValidation';
import * as accountActions from 'store/Account/actions';
import AccountSigin from 'components/forms/AccountSigin';

class SignInContainer extends Component {
  render() {
    const { getAccountByPin, history } = this.props;
    return (
      <Formik
        initialValues={{ pin: '565656' }}
        validationSchema={accountValidation}
        onSubmit={values => {
          getAccountByPin(values.pin).then(() => {
            history.push('/actions');
          });
        }}
        render={(formProps) =>( 
          <AccountSigin
            {...formProps}
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
