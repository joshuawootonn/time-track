import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Formik } from 'formik';

import { auth as authValidation } from 'constants/formValidation';
import * as actions from 'store/User/actions';
import * as routes from 'constants/routes';
import * as IPCConstants from 'constants/ipc';
import AuthSigin from 'components/forms/AuthSignin';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { error: '' };
  }

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
          onSubmit={(values, functions) => {
            const { history } = this.props;
            const { username, password } = values;
            this.props
              .login(username, password)
              .then(() => {
                ipcRenderer.sendSync(IPCConstants.SET_CRED, {
                  username,
                  password,
                });
                history.push(routes.ROOT);
              })
              .catch(error => {
                this.setState({ error: error.message });
                functions.setSubmitting(false);
              });
          }}
          render={({ errors, touched, isSubmitting }) => {
            return (
              <AuthSigin
                touched={touched}
                isSubmitting={isSubmitting}
                errors={errors}
                globalError={this.state.error}
              />
            );
          }}
        />
      </div>
    );
  }
}

SignInForm.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return { user: state.user };
};

export default withRouter(
  connect(
    mapStateToProps,
    actions,
  )(SignInForm),
);
