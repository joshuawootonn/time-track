import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import ExportContainer from 'containers/Export/exportContainer';


const styles = () => ({
  hero: {
    height: `100vh`,
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`,
    alignItems: `center`
  }
});

class Export extends Component {
  render() {
    const { classes } = this.props;
    return(  
    
      <div className={classes.hero}><ExportContainer /></div>
    )
    ;
  }
}

Export.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)( Export);
