import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Typography,List,ListItem,ListItemText } from '@material-ui/core';

import CategoryIndexContainer from 'containers/Analyze/categoryIndexContainer';
import CategoryDetailContainer from 'containers/Analyze/categoryDetailContainer';
import SubcategoryIndexContainer from 'containers/Analyze/subcategoryIndexContainer';
import SubcategoryDetailContainer from 'containers/Analyze/subcategoryDetailContainer';

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

const settings =['Authority','Crew','Category','Subcategory'];

export class SettingsModal extends Component {
  state = {
    currentMenu: 0
  }
  menuSelect = num => () => {
    this.setState({
      currentMenu: num
    });
  }
  render () {
    const { classes } = this.props;
    return ( 
      <div>    
        <Typography variant="h3">Settings</Typography>
        <div className={classes.root}>
          <List>
            {settings.map((setting,i) => {
              return (
                <ListItem key={i}>
                  <ListItemText onClick={this.menuSelect(i)} primary={setting}/>
                </ListItem>
              );
            })}
          </List>
        </div> 
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

SettingsModal.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(SettingsModal);