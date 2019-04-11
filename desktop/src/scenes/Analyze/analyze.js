import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AppBar, Tabs, Tab, IconButton,Toolbar,Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ArrowBack, Settings } from '@material-ui/icons';
import moment from 'moment';

import { employeeActions,projectActions,taskActions,shiftActions, analyzeActions } from 'store/actions';
import EmployeeDetailsContainer from 'containers/Analyze/employeeDetailsContainer';
import EmployeeIndexContainer from 'containers/Analyze/employeeIndexContainer';
import TaskDetailContainer from 'containers/Analyze/taskDetailContainer';
import TaskIndexContainer from 'containers/Analyze/taskIndexContainer';
import ProjectDetailContainer from 'containers/Analyze/projectDetailContainer';
import ProjectIndexContainer from 'containers/Analyze/projectIndexContainer';
import ShiftIndexContainer from 'containers/Analyze/shiftIndexContainer';
import ShiftCRUDContainer from 'containers/Analyze/shiftCRUDContainer';

const styles = {
  root: {
    height: `100vh`
  },
  tab: {
    height: `calc(100% - 48px)`,
    display: `flex`
  },
  grow: {
    flexGrow: 1
  },
  tool: {
    minHeight: 0
  }
  // visible: {
  //   display: 'flex'
  // }
};

export class Analyze extends Component {

  state = {
    tabValue: 0
  }  
  componentDidMount = () => {
    // Fetching here to ensure that all employees have been fetched before we try and display their name for their shift
    this.props.getAllEmployees();
    this.props.getAllProjects();
    this.props.getAllTasks();
    this.props.getShiftsInRange(moment().subtract(100, `days`).format(`MM-DD-YY HH:mm:ss`), moment().add(14,`days`).format(`MM-DD-YY HH:mm:ss`));
  }

  handleTabValueChange = (e, tabValue) => {
    this.setState({ tabValue });
  }

  back = () => {
    this.props.history.push(`/`);
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
        <Grid container className={classes.tab } >
          <Grid item xs={6}>
            <EmployeeIndexContainer />
          </Grid>
          <Grid item xs={6}>
            <EmployeeDetailsContainer />
          </Grid>
        </Grid>}
        { tabValue === 1  && 
        <Grid container className={classes.tab} >
          <Grid item xs={6}>
            <ProjectIndexContainer />
          </Grid>
          <Grid item xs={6}>
            <ProjectDetailContainer />
          </Grid>
        </Grid>}
        { tabValue === 2  && 
        <Grid container className={classes.tab}>          
          <Grid item xs={6}>
            <TaskIndexContainer />
          </Grid>
          <Grid item xs={6}>
            <TaskDetailContainer />
          </Grid>
        </Grid> } 
        { tabValue === 3  && 
        <Grid container className={classes.tab} >
          <Grid item xs={6}>
            <ShiftIndexContainer />
          </Grid>
          <Grid item xs={6}>
            <ShiftCRUDContainer /> 
          </Grid>
        </Grid>} 
      </div>
    );
  }
}

Analyze.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openSettings: PropTypes.func.isRequired,
  getShiftsInRange: PropTypes.func.isRequired,
  getAllEmployees: PropTypes.func.isRequired,
  getAllProjects: PropTypes.func.isRequired,
  getAllTasks: PropTypes.func.isRequired
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {      
    openSettings: () => {
      return dispatch(analyzeActions.editSettingsModal());
    },
    getAllEmployees: () => {
      return dispatch(employeeActions.getAllEmployees());
    },
    getAllProjects: () => {
      return dispatch(projectActions.getAllProjects());
    },
    getAllTasks: () => {
      return dispatch(taskActions.getAllTasks());
    },
    getShiftsInRange: (start, end) => {
      return dispatch(shiftActions.getShiftsInRange(start, end));
    }  
  };
};

export default connect(null,mapDispatchToProps)(withRouter(withStyles(styles)(Analyze)));