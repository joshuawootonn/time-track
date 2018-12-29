import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Typography, List, ListItem, ListItemText, Grid } from '@material-ui/core';

import Modal from 'components/floaters/Modal';

import AuthorityIndexContainer from 'containers/Analyze/authorityIndexContainer';
import AuthorityDetailContainer from 'containers/Analyze/authorityDetailContainer';
import CrewIndexContainer from 'containers/Analyze/crewIndexContainer';
import CrewDetailContainer from 'containers/Analyze/crewDetailContainer';
import CategoryIndexContainer from 'containers/Analyze/categoryIndexContainer';
import CategoryDetailContainer from 'containers/Analyze/categoryDetailContainer';
import SubcategoryIndexContainer from 'containers/Analyze/subcategoryIndexContainer';
import SubcategoryDetailContainer from 'containers/Analyze/subcategoryDetailContainer';


const styles = () => ({
  modal: {
    width: '90%',
    height: '80vh',
    maxHeight: '90%'
  },
  listWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  gridContainer: {
    height: '100%'
  },
  index: {
    minWidth: '260px'
  },
  detail: {
    minWidth: '400px'
  }
});

const settings = ['Authority', 'Crew', 'Category', 'Subcategory'];

export class SettingsModal extends Component {
  state = {
    currentMenu: 0
  }
  menuSelect = num => () => {
    this.setState({
      currentMenu: num
    });
    console.log(num);
  }
  render() {
    const { classes, open, toggleModal } = this.props;
    const { currentMenu } = this.state;
    return (
      <Modal className={classes.modal} open={open} toggle={toggleModal}>
        {/* <Typography variant="h3">Settings</Typography> */}
        <Grid container className={classes.gridContainer}  spacing={8}>
          <Grid item xs={2}>
            <div className={classes.listWrapper}>
              <List>
                {settings.map((setting, i) => {
                  return (
                    <ListItem key={i}>
                      <ListItemText onClick={this.menuSelect(i)} primary={setting} />
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </Grid>
          
          {currentMenu === 0 && 
            <Grid item xs={10}>
              <Grid container className={classes.gridContainer}  spacing={0}>
                <Grid item xs={4}>
                  <AuthorityIndexContainer />
                </Grid>
                <Grid item xs={8}>
                  <AuthorityDetailContainer />
                </Grid>
              </Grid>          
            </Grid>}

          {currentMenu === 1 && 
            <Grid item xs={10}>
              <Grid container className={classes.gridContainer}  spacing={0}>
                <Grid item xs={4}>
                  <CrewIndexContainer />
                </Grid>
                <Grid item xs={8}>
                  <CrewDetailContainer />
                </Grid>
              </Grid>          
            </Grid>}

          {currentMenu === 2 &&
            <Grid item xs={10}>
              <Grid container className={classes.gridContainer}  spacing={0}>
                <Grid item xs={5}>
                  <CategoryIndexContainer />
                </Grid>
                <Grid item xs={7}>
                  <CategoryDetailContainer />
                </Grid>
              </Grid>          
            </Grid>}
           
          {currentMenu === 3 && 
            <Grid item xs={10}>
              <Grid container className={classes.gridContainer}  spacing={0}>
                <Grid item xs={5}>
                  <SubcategoryIndexContainer />
                </Grid>
                <Grid item xs={7}>
                  <SubcategoryDetailContainer />
                </Grid>
              </Grid>          
            </Grid>}
                  
        </Grid>         
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