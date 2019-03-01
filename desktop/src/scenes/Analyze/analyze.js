import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import cx from 'classnames';
import { AppBar, Tabs, Tab, IconButton,Toolbar,Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ArrowBack, Settings } from '@material-ui/icons';

import { analyzeActions } from 'store/actions';
import EmployeeDetailsContainer from 'containers/Analyze/employeeDetailsContainer';
import EmployeeIndexContainer from 'containers/Analyze/employeeIndexContainer';
import TaskDetailContainer from 'containers/Analyze/taskDetailContainer';
import TaskIndexContainer from 'containers/Analyze/taskIndexContainer';
import ProjectDetailContainer from 'containers/Analyze/projectDetailContainer';
import ProjectIndexContainer from 'containers/Analyze/projectIndexContainer';
import ShiftIndexContainer from 'containers/Analyze/shiftIndexContainer';
import ShiftDetailsContainer from 'containers/Analyze/shiftDetailsContainer';

const styles = {
  root: {
    height: '100vh'
  },
  tab: {
    height: 'calc(100% - 48px)',
    display: 'none'
  },
  grow: {
    flexGrow: 1
  },
  tool: {
    minHeight: 0
  },
  visible: {
    display: 'flex'
  }
};

export class Analyze extends Component {

  state = {
    tabValue: 3
  }  

  handleTabValueChange = (e, tabValue) => {
    this.setState({ tabValue });
  }

  back = () => {
    this.props.history.goBack();
  }

  render() {
    const { tabValue } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.tool}>
            <Tabs value={tabValue} onChange={this.handleTabValueChange} className={classes.grow}>
              <Tab label="Employees" />
              <Tab label="Projects" />              
              <Tab label="Tasks" />
              <Tab label="Shifts" />
            </Tabs>
            <IconButton color="inherit" onClick={this.props.openSettings}><Settings /></IconButton>
            <IconButton color="inherit" onClick={this.back}><ArrowBack /></IconButton>
          </Toolbar>
        </AppBar>
        { tabValue === 0  && 
        <Grid container className={cx(classes.tab,{ [classes.visible]: tabValue === 0 })} >
          <Grid item xs={7}>
            <EmployeeIndexContainer />
          </Grid>
          <Grid item xs={5}>
            <EmployeeDetailsContainer />
          </Grid>
        </Grid>}
        { tabValue === 1  && 
        <Grid container className={cx(classes.tab,{ [classes.visible]: tabValue === 1 })} >
          <Grid item xs={4}>
            <ProjectIndexContainer />
          </Grid>
          <Grid item xs={8}>
            <ProjectDetailContainer />
          </Grid>
        </Grid>}
        { tabValue === 2  && 
        <Grid container className={cx(classes.tab,{ [classes.visible]: tabValue === 2 })} >          
          <Grid item xs={7}>
            <TaskIndexContainer />
          </Grid>
          <Grid item xs={5}>
            <TaskDetailContainer />
          </Grid>
        </Grid> }
        { tabValue === 3  && 
        <Grid container className={cx(classes.tab,{ [classes.visible]: tabValue === 3 })} >
          <Grid item xs={6}>
            <ShiftIndexContainer />
          </Grid>
          <Grid item xs={6}>
            <ShiftDetailsContainer /> 
          </Grid>
        </Grid>}
      </div>
    );
  }
}

Analyze.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openSettings: PropTypes.func.isRequired
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {      
    openSettings: () => {
      return dispatch(analyzeActions.editSettingsModal());
    }
  };
};

export default connect(null,mapDispatchToProps)(withRouter(withStyles(styles)(Analyze)));