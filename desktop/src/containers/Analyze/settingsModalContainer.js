import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Typography, List, ListItem, ListItemText, Grid, Collapse, ListItemIcon } from '@material-ui/core';
import { Category, Apps, Person, Group  } from '@material-ui/icons';
import Modal from 'components/floaters/Modal';

import AuthorityIndexContainer from 'containers/Analyze/authorityIndexContainer';
import AuthorityDetailContainer from 'containers/Analyze/authorityDetailContainer';
import CrewIndexContainer from 'containers/Analyze/crewIndexContainer';
import CrewDetailContainer from 'containers/Analyze/crewDetailContainer';
import CategoryIndexContainer from 'containers/Analyze/categoryIndexContainer';
import CategoryDetailContainer from 'containers/Analyze/categoryDetailContainer';
import SubcategoryIndexContainer from 'containers/Analyze/subcategoryIndexContainer';
import SubcategoryDetailContainer from 'containers/Analyze/subcategoryDetailContainer';


const styles = theme => ({
  modal: {
    width: '90%',
    maxWidth: '1200px',
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
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

const settings = [{
  label: 'Authority',
  icon: Person
},{
  label: 'Crew',
  icon: Group
},{
  label: 'Category',
  icon: Category
},{
  label: 'Subcategory',
  icon: Apps
}];

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
        
        <Grid container className={classes.gridContainer}  spacing={8}>
          <Grid item xs={2}>
            <Typography variant="h4">Settings</Typography>
            <div className={classes.listWrapper}>            
                
              <List >
                {settings.map((setting, i) => {
                  return (
                    <ListItem button key={i} selected={this.state.currentMenu === i} onClick={this.menuSelect(i)}className={classes.nested}>
                      <ListItemIcon>
                        <setting.icon />
                      </ListItemIcon>
                      <ListItemText primary={setting.label} />
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