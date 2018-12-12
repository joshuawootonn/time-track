import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Formik } from 'formik';

import { auth as authValidation } from 'constants/formValidation';
import * as actions from 'store/User/actions';
import * as routes from 'constants/routes';
import * as IPCConstants from 'constants/ipc';
import AuthSiginForm from 'components/forms/AuthSignin';
import { userSelectors } from 'store/selectors';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export class AuthSignin extends Component {
  componentDidMount = () => {
    const cred = ipcRenderer.sendSync(IPCConstants.GET_CRED, '');
    if (cred.username && cred.password) {
      this.props.login(cred.username, cred.password).then(() => {
        this.props.history.push('/');
      });
    }
  };
  render() {
    return (
      <div>
        <Formik
          initialValues={{ username: 'josh', password: '5656' }}
          validationSchema={authValidation}
          onSubmit={(values, formikFunctions) => {
            const { history,login } = this.props;
            const { username, password } = values;            
            return login(username, password)
              .then(() => {
                formikFunctions.resetForm();
                formikFunctions.setStatus({ success: true });
                ipcRenderer.sendSync(IPCConstants.SET_CRED, {
                  username,
                  password
                }); 
                history.push(routes.ROOT);
              })
              .catch(error => {
                formikFunctions.setErrors({ submit: error.message });
                formikFunctions.setStatus({ success: false });
                formikFunctions.setSubmitting(false);
              });
          }}
          render={formProps => {
            return ( <AuthSiginForm {...formProps}/> );
          }}
        />
      </div>
    );
  }
}

AuthSignin.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { user: userSelectors.getUser(state) };
};

export default withRouter(connect(mapStateToProps,actions)(AuthSignin));
