import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Formik } from 'formik';

import { auth as authValidation } from 'constants/formValidation';
import { userActions } from 'store/actions';
import * as routes from 'constants/routes';
import * as IPCConstants from 'constants/ipc';
import AuthSiginForm from 'components/forms/AuthSignin';
import { userSelectors } from 'store/selectors';

const electron = window.require(`electron`);
const ipcRenderer = electron.ipcRenderer;

export class AuthSignin extends Component {  
  render() {
    const cred = ipcRenderer.sendSync(IPCConstants.GET_CRED, ``);
    const hasValidCred = cred.ip && cred.username && cred.password;
    
    return (
      <Formik
        initialValues={hasValidCred ? { ip: cred.ip, username: cred.username, password: cred.password } : { ip: ``, username: ``, password: `` }}
        validationSchema={authValidation}
        onSubmit={(values, formikFunctions) => {
          const { history,login } = this.props;
          const { ip, username, password } = values;    
          ipcRenderer.sendSync(IPCConstants.SET_CRED, {
            ip,
            username,
            password
          });              
          return login(ip, username, password)
            .then(() => {                 
              formikFunctions.resetForm();
              formikFunctions.setStatus({ success: true });              
              history.push(routes.ROOT);              
            },
            error => {
              formikFunctions.setErrors({ submit: error.message });
              formikFunctions.setStatus({ success: false });
              formikFunctions.setSubmitting(false);
            });
        }}
        render={formProps => {
          return ( <AuthSiginForm {...formProps}/> );
        }}
      />
    );
    
    
  }
}

AuthSignin.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

/* istanbul ignore next */
const mapStateToProps = state => {
  return { user: userSelectors.getUser(state) };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    login: (ip,username,password) => {
      return dispatch(userActions.login(ip,username,password));
    }
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AuthSignin));
