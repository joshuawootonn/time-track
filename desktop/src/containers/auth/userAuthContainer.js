import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'store/User/actions';
import * as routes from 'constants/routes';
import * as IPCConstants from 'constants/ipc';
import SigninForm from 'components/forms/SigninForm';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'AACI',
      password: '',
      error: null,
    };
  }
  componentDidMount = () => {
    const cred = ipcRenderer.sendSync(IPCConstants.GET_CRED, '');

    if (cred.username && cred.password) {
      this.props.login(cred.username, cred.password).then(() => {
        this.props.history.push(routes.SIGNIN);
      });
    }
  };

  onSubmit = event => {
    const { username, password } = this.state;
    const { history } = this.props;

    this.props
      .login(username, password)
      .then(() => {
        ipcRenderer.sendSync(IPCConstants.SET_CRED, { username, password });
        history.push(routes.SIGNIN);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  };
  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }
  // send = () => {
  //   console.log(ipcRenderer.sendSync(IPCConstants.SET_CRED,{username: "",password: ""}))
  // }
  // receive = () => {
  //   console.log(ipcRenderer.sendSync(IPCConstants.GET_CRED,"the message"))
  // }

  render() {
    const { username, password, error } = this.state;    
    return <SigninForm 
      username={username} 
      password={password} 
      error={error} 
      onChange={this.onChange} 
      onSubmit={this.onSubmit} 
    />    
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
