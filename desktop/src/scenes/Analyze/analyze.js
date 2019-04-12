import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AppBar, Tabs, Tab, IconButton,Toolbar,Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ArrowBack, Settings } from '@material-ui/icons';
import moment from 'moment';

import { employeeActions,projectActions,taskActions,shiftActions, analyzeActions } from 'store/actions';

import EmployeeCRUD from 'containers/Employee/employeeCRUD.container';
import EmployeeIndex from 'containers/Employee/employeeIndex.container';
import EmployeeFilter from 'containers/Employee/employeeFilter.container';
import EmployeeToolbar from 'containers/Employee/employeeToolbar.container';

import TaskDetailContainer from 'containers/Analyze/taskDetailContainer';
import TaskIndexContainer from 'containers/Analyze/taskIndexContainer';
import ProjectDetailContainer from 'containers/Analyze/projectDetailContainer';
import ProjectIndexContainer from 'containers/Analyze/projectIndexContainer';

import ShiftToolbar from 'containers/Shift/shiftToolbar.container';
import ShiftIndex from 'containers/Shift/shiftIndex.container';
import ShiftFilter from 'containers/Shift/shiftFilter.container';
import ShiftCRUD from 'containers/Shift/shiftCRUD.container';

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
  },
  gridHeight: {
    height: `calc(100% - 64px)`,
    position: `relative`
  }
};

export class Analyze extends Component {

  state = {
    tabValue: 3
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
          <Grid item xs={6} className={classes.gridHeight}>
            <EmployeeToolbar />
            <EmployeeFilter />            
            <EmployeeIndex />            
          </Grid>
          <Grid item xs={6} className={classes.gridHeight}>
            <EmployeeCRUD />
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
          <Grid item xs={6} className={classes.gridHeight}>
            <ShiftToolbar />
            <ShiftFilter />
            <ShiftIndex />
          </Grid>
          <Grid item xs={6} className={classes.gridHeight}>
            <ShiftCRUD /> 
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