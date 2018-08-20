import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Formik } from 'formik';

import { account as accountValidation } from 'constants/formValidation';
import { employeeActions,staticActions } from 'store/actions';
import AccountSigin from 'components/forms/AccountSigin';

class SignInContainer extends Component {
  render() {
    const { login, history,getStaticData } = this.props;
    return (
      <Formik
        initialValues={{ pin: '565656' }}
        validationSchema={accountValidation}
        onSubmit={values => {
          login(values.pin).then((asdf) => {
            history.push('/employee');
          });
          getStaticData();
        }}
        render={formProps => <AccountSigin {...formProps} />}
      />
    );
  }
}

SignInContainer.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    login: pin => {
      return dispatch(employeeActions.login(pin));
    },
    getStaticData: () => {
      return dispatch(staticActions.getStaticData());
   }
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(SignInContainer),
);
