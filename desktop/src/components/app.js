import React from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom';

import Navigation from 'components/Auth/Navigation';
import LandingPage from './Auth/Landing';
import SignUpPage from './Auth/SignUp';
import SignInPage from './Auth/SignIn';
import PasswordForgetPage from './Auth/PasswordForget';
import HomePage from './Auth/Home';
import AccountPage from './Auth/Account';

import * as routes from 'constants/routes';


const App = () =>
  <Router>
    <div>
      <Navigation />

      <hr/>

      <Route
        exact path={routes.LANDING}
        component={() => <LandingPage />}
      />
      <Route
        exact path={routes.SIGN_UP}
        component={() => <SignUpPage />}
      />
      <Route
        exact path={routes.SIGN_IN}
        component={() => <SignInPage />}
      />
      <Route
        exact path={routes.PASSWORD_FORGET}
        component={() => <PasswordForgetPage />}
      />
      <Route
        exact path={routes.HOME}
        component={() => <HomePage />}
      />
      <Route
        exact path={routes.ACCOUNT}
        component={() => <AccountPage />}
      />
    </div>
  </Router>

export default App;

