import React, { Component } from 'react';

import { Grid } from '@material-ui/core';

import AuthorityIndexContainer from 'containers/Analyze/authorityIndexContainer';
import AuthorityDetailContainer from 'containers/Analyze/authorityDetailContainer';

class AuthorityEditContainer extends Component {
  render () {
    return (
      <Grid container>
        <Grid item xs={7}>
          <AuthorityIndexContainer />
        </Grid>
        <Grid item xs={5}>
          <AuthorityDetailContainer />
        </Grid>
      </Grid>
    );
  }
}

export default AuthorityEditContainer;