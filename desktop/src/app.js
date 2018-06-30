import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from 'auth/privateRoute';
import { connect } from 'react-redux';
import Unauthed from 'auth/appUnauthed';
import Authed from 'auth/appAuthed';
import * as actions from 'store/User/actions';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/auth" component={Unauthed} />
          <PrivateRoute user={this.props.user} path="/" component={Authed} />
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  actions,
)(App);
