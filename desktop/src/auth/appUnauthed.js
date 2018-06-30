import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'store/User/actions';
import * as routes from 'constants/routes';
import * as IPCConstants from 'constants/ipc';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: null,
    };
  }
  componentDidMount = () => {
    const cred = ipcRenderer.sendSync(IPCConstants.GET_CRED, '');
    if (cred.username && cred.password) {
      this.props.login(cred.username, cred.password).then(asdf => {
        this.props.history.push(routes.HOME);
      });
    }
  };

  onSubmit = event => {
    const { username, password } = this.state;
    const { history } = this.props;

    this.props
      .login(username, password)
      .then(asdf => {
        ipcRenderer.sendSync(IPCConstants.SET_CRED, { username, password });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  };
  // send = () => {
  //   console.log(ipcRenderer.sendSync(IPCConstants.SET_CRED,{username: "",password: ""}))
  // }
  // receive = () => {
  //   console.log(ipcRenderer.sendSync(IPCConstants.GET_CRED,"the message"))
  // }

  render() {
    const { username, password, error } = this.state;

    const isInvalid = password === '' || username === '';

    return (
      <div>
        <h1>Sign in</h1>
        <form onSubmit={this.onSubmit}>
          <input
            value={username}
            onChange={event =>
              this.setState(byPropKey('username', event.target.value))
            }
            type="text"
            placeholder="Username"
          />
          <input
            value={password}
            onChange={event =>
              this.setState(byPropKey('password', event.target.value))
            }
            type="password"
            placeholder="Password"
          />
          <button disabled={isInvalid} type="submit">
            Sign In
          </button>

          {error && <p>{error.message}</p>}
        </form>
        {/*         
        <button onClick={this.send}>Send!</button>
        <button onClick={this.receive}>Get!</button> */}
      </div>
    );
  }
}

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
