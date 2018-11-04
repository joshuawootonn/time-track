import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Formik } from 'formik';

import { account as accountValidation } from 'constants/formValidation';
import { employeeActions, staticActions } from 'store/actions';
import AccountSigin from 'components/forms/AccountSigin';

class SignInContainer extends Component {

  componentDidMount = () => {
    //REMOVE before deploy
    // const { login, history, getStaticData, authorityEntities } = this.props;
    // getStaticData();
    // login('565656').then(asdf => {
    //   const { authorityId } = asdf.data;  
    //   history.push(`/${authorityEntities[authorityId].type}`);         
    // });    
  }
  render() {
    const { login, history, getStaticData, authorityEntities } = this.props;
    return (
      <Formik
        initialValues={{ pin: '565656' }}
        validationSchema={accountValidation}
        onSubmit={(values,formikFunctions) => {
          login(values.pin).then(
            response => {
              formikFunctions.resetForm();
              formikFunctions.setStatus({ success: true });
              const { authorityId } = response.data;
              history.push(`/${authorityEntities[authorityId].type}`);
              getStaticData();
            },
            () => {
              formikFunctions.setStatus({ success: false });
              formikFunctions.setSubmitting(false);              
              formikFunctions.setErrors({ submit: 'Invalid pin!' });
            }
          );          
        }}
        render={formProps => <AccountSigin {...formProps} />}
      />
    );
  }
}

SignInContainer.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    authorityEntities: state.entities.authorities
  };
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
    mapStateToProps,
    mapDispatchToProps,
  )(SignInContainer),
);
