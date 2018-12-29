import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Typography,List,ListItem,ListItemText } from '@material-ui/core';

import Modal from 'components/floaters/Modal';

import CategoryIndexContainer from 'containers/Analyze/categoryIndexContainer';
import CategoryDetailContainer from 'containers/Analyze/categoryDetailContainer';
// import SubcategoryIndexContainer from 'containers/Analyze/subcategoryIndexContainer';
// import SubcategoryDetailContainer from 'containers/Analyze/subcategoryDetailContainer';

const styles = () => ({
  modal: {
    width: '90%'
  },
  listWrapper: {
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
    const { classes, open, toggleModal } = this.props;
    return ( 
      <Modal className={classes.modal} open={open} toggle={toggleModal}>    
        <Typography variant="h3">Settings</Typography>
        <div className={classes.listWrapper}>
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
      </Modal>
    );  
  }
}

SettingsModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired
};


export default withStyles(styles)(SettingsModal);