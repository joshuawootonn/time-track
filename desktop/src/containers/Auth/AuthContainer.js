import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Formik } from 'formik';


import { auth as authValidation} from 'constants/formValidation';
import * as actions from 'store/User/action';
import * as routes from 'constants/routes';
import * as IPCConstants from 'constants/ipc';
import AuthSigin from 'components/forms/AuthSignin';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;


class SignInForm extends Component {

  componentDidMount = () => {
    const cred = ipcRenderer.sendSync(IPCConstants.GET_CRED, '');

    // if (cred.username && cred.password) {
    //   this.props.login(cred.username, cred.password).then(() => {
    //     this.props.history.push('/');
    //   });
    // }
  };

  render() {
    return (
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={authValidation}
        onSubmit={values => {
          const { history } = this.props;
          const {username, password} = values

          this.props
            .login(username, password)
            .then(() => {
              ipcRenderer.sendSync(IPCConstants.SET_CRED, { username, password });
              history.push(routes.SIGNIN);
            })
            .catch(error => {
              //this.setState(byPropKey('error', error));

              // TODO: Add a handler for network error

              //
            });
        }}
        render={({ errors, touched, isSubmitting }) => (
          <AuthSigin
            touched={touched}
            isSubmitting={isSubmitting}
            errors={errors}
          />
        )} 
        
      />
     
    );
  }
}

SignInForm.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    actions,
  )(SignInForm),
);
