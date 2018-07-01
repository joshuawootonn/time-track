import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from 'containers/auth/privateRouteContainer';
import * as actions from 'store/User/actions';
import { connect } from 'react-redux';
import UserAuthContainer from 'containers/auth/userAuthContainer';
import AccountActionScene from 'scenes/accountActionScene';
import SigninScene from 'scenes/signinScene';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/auth" component={UserAuthContainer}/>
           <PrivateRoute user={this.props.user} path="/" component={AccountActionScene}/>
            <PrivateRoute user={this.props.user} path="/sign" component={SigninScene} />             
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
