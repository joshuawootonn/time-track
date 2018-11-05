import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import AuthorityIndexContainer from 'containers/Analyze/authorityIndexContainer';
import AuthorityDetailContainer from 'containers/Analyze/authorityDetailContainer';



const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'  
  },
  min: {
    minWidth: '220px'
  }
});



class AuthorityEditContainer extends Component {
  
  render () {
    const { classes } = this.props;
    return ( 
      <div className={classes.root}>
        <div className={classes.min}>
          <AuthorityIndexContainer />
        </div>
        <div className={classes.min}>
          <AuthorityDetailContainer />
        </div>
      </div>
    );   
  }
}



AuthorityEditContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AuthorityEditContainer);