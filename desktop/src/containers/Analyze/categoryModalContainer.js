import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import CategoryIndexContainer from 'containers/Analyze/categoryIndexContainer';
import CategoryDetailContainer from 'containers/Analyze/categoryDetailContainer';
// import SubcategoryIndexContainer from 'containers/Analyze/subcategoryIndexContainer';
// import SubcategoryDetailContainer from 'containers/Analyze/subcategoryDetailContainer';

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  index: {
    minWidth: '260px'
  },
  detail: {
    minWidth: '400px'
  }
});

export class CategoryModal extends Component {
  render () {
    const { classes } = this.props;
    return ( 
      <div className={classes.root}>     
        <div className={classes.index}>
          <CategoryIndexContainer />
        </div>
        <div className={classes.detail}>
          <CategoryDetailContainer />
        </div>
        {/* <div className={classes.index}>
          <SubcategoryIndexContainer /> 
        </div>
        <div className={classes.detail}>
          <SubcategoryDetailContainer /> 
        </div> */}
      </div>
    );  
  }
}

CategoryModal.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(CategoryModal);