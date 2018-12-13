import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import CrewIndexContainer from 'containers/Analyze/crewIndexContainer';
import CrewDetailContainer from 'containers/Analyze/crewDetailContainer';

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'  
  },
  min: {
    minWidth: '230px'
  }
});

export class CrewModal extends Component {  
  render () {
    const { classes } = this.props;
    return ( 
      <div className={classes.root}>     
        <div className={classes.min}>
          <CrewIndexContainer />
        </div>
        <div className={classes.min}>
          <CrewDetailContainer /> 
        </div>
      </div>
    );   
  }
}

CrewModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CrewModal);