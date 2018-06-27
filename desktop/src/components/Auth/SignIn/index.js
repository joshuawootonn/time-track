import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'store/User/actions';
import * as routes from 'constants/routes';

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
    console.log(this.props);
  }
  
  onSubmit = (event) => {
    const {
      username,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    this.props.login(username, password)
      .then(() => {
        console.log("how")
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      username,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      username === '';

    return (
      <div>
        <h1>Sign in</h1>
        <form onSubmit={this.onSubmit}>
          <input
            value={username}
            onChange={event => this.setState(byPropKey('username', event.target.value))}
            type="text"
            placeholder="Username"
          />
          <input
            value={password}
            onChange={event => this.setState(byPropKey('password', event.target.value))}
            type="password"
            placeholder="Password"
          />
          <button disabled={isInvalid} type="submit">
            Sign In
        </button>

          {error && <p>{error.message}</p>}
        </form>

      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


export default withRouter(connect(mapStateToProps, actions)(SignInForm));

