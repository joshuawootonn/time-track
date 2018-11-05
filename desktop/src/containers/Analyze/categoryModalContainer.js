import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import CategoryIndexContainer from 'containers/Analyze/categoryIndexContainer';
import SubCategoryIndexContainer from 'containers/Analyze/subcategoryIndexContainer';

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

class CategoryModalContainer extends Component {
  render () {
    const { classes } = this.props;
    return ( 
      <div className={classes.root}>     
        <div className={classes.min}>
          <CategoryIndexContainer />
        </div>
        <div className={classes.min}>
          <SubCategoryIndexContainer /> 
        </div>
      </div>
    );  
  }
}

CategoryModalContainer.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(CategoryModalContainer);