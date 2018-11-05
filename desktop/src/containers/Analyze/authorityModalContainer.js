import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import AuthorityIndexContainer from 'containers/Analyze/authorityIndexContainer';
import AuthorityDetailContainer from 'containers/Analyze/authorityDetailContainer';



const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }  
});



class AuthorityEditContainer extends Component {
  
  render () {
    const { classes } = this.props;
    return ( 
      <div className={classes.root}>
        <AuthorityIndexContainer />
        <AuthorityDetailContainer />
      </div>
    );   
  }
}



AuthorityEditContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AuthorityEditContainer);