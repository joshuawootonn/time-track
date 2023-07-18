import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  AppBar,
  Tabs,
  Tab,
  IconButton,
  Toolbar,
  Grid,
  Tooltip
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ArrowBack, Settings, Storage } from '@material-ui/icons';
import moment from 'moment';

import {
  employeeActions,
  projectActions,
  taskActions,
  shiftActions,
  analyzeActions
} from '~/store/actions';

import EmployeeCRUD from '~/containers/Employee/employeeCRUD.container';
import EmployeeIndex from '~/containers/Employee/employeeIndex.container';
import EmployeeFilter from '~/containers/Employee/employeeFilter.container';
import EmployeeToolbar from '~/containers/Employee/employeeToolbar.container';

import TaskCRUD from '~/containers/Task/taskCRUD.container';
import TaskIndex from '~/containers/Task/taskIndex.container';
import TaskToolbar from '~/containers/Task/taskToolbar.container';
import TaskFilter from '~/containers/Task/taskFilter.container';

import ProjectToolbar from '~/containers/Project/projectToolbar.container';
import ProjectFilterContainer from '~/containers/Project/projectFilter.container';
import ProjectCRUD from '~/containers/Project/projectCRUD.container';
import ProjectIndex from '~/containers/Project/projectIndex.container';

import ShiftToolbar from '~/containers/Shift/shiftToolbar.container';
import ShiftIndex from '~/containers/Shift/shiftIndex.container';
import ShiftFilter from '~/containers/Shift/shiftFilter.container';
import ShiftCRUD from '~/containers/Shift/shiftCRUD.container';
import ShiftTotal from '~/containers/Shift/shiftTotal.container';
import Progress from '~/components/helpers/Progress';
import isElectron from '~/helpers/IsElectron';

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
    height: `auto`,
    position: `relative`,
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid rgba(224, 224, 224, 1)'
  }
};

export class Analyze extends Component {
  //REMOVE
  state = {
    tabValue: 3,
    isLoading: true,
    isElectron: isElectron()
  };
  componentDidMount = async () => {
    Promise.all([
      this.props.getAllEmployees(),
      this.props.getAllProjects(),
      this.props.getAllTasks(),
      this.props.getShiftsInRange(
        moment()
          .subtract(365, `days`)
          .format(`MM-DD-YY HH:mm:ss`),
        moment()
          .add(14, `days`)
          .format(`MM-DD-YY HH:mm:ss`)
      )
    ]).then(() => {
      this.setState({ ...this.state, isLoading: false });
    });
  };

  handleTabValueChange = (e, tabValue) => {
    this.setState({ tabValue });
  };

  back = () => {
    this.props.history.push(`/`);
  };

  goToTab = number => {
    this.setState({ ...this.state, tabValue: number });
  };

  render() {
    const { tabValue } = this.state;
    const { classes } = this.props;

    if (this.state.isLoading)
      return (
        <div className={classes.root}>
          <Progress variant="circular" fullWidth fullHeight />
        </div>
      );

    return (
      <div className={classes.root}>
        <AppBar position="static" elevation={0}>
          <Toolbar className={classes.tool}>
            <Tabs
              value={tabValue}
              onChange={this.handleTabValueChange}
              className={classes.grow}
            >
              <Tab label="Employees" />
              <Tab label="Projects" />
              <Tab label="Tasks" />
              <Tab label="Shifts" />
            </Tabs>
            {this.state.isElectron && (
              <Tooltip title="Export" placement="bottom">
                <IconButton color="inherit" onClick={this.props.openExport}>
                  <Storage />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Settings" placement="bottom">
              <IconButton color="inherit" onClick={this.props.openSettings}>
                <Settings />
              </IconButton>
            </Tooltip>
            <Tooltip title="Go Back" placement="bottom">
              <IconButton color="inherit" onClick={this.back}>
                <ArrowBack />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        {tabValue === 0 && (
          <Grid container className={classes.tab}>
            <Grid item xs={6} className={classes.gridHeight}>
              <EmployeeToolbar />
              <EmployeeFilter />
              <div
                style={{
                  flex: '1 1 auto'
                }}
              >
                <EmployeeIndex />
              </div>
            </Grid>
            <Grid item xs={6} className={classes.gridHeight}>
              <EmployeeCRUD />
            </Grid>
          </Grid>
        )}
        {tabValue === 1 && (
          <Grid container className={classes.tab}>
            <Grid item xs={5} className={classes.gridHeight}>
              <ProjectToolbar />
              <ProjectFilterContainer />
              <div
                style={{
                  flex: '1 1 auto'
                }}
              >
                <ProjectIndex />
              </div>
            </Grid>
            <Grid item xs={7}>
              <ProjectCRUD goToTab={this.goToTab} />
            </Grid>
          </Grid>
        )}
        {tabValue === 2 && (
          <Grid container className={classes.tab}>
            <Grid item xs={6} className={classes.gridHeight}>
              <TaskToolbar />
              <TaskFilter />
              <div
                style={{
                  flex: '1 1 auto'
                }}
              >
                <TaskIndex />
              </div>
            </Grid>
            <Grid item xs={6}>
              <TaskCRUD />
            </Grid>
          </Grid>
        )}
        {tabValue === 3 && (
          <Grid container className={classes.tab}>
            <Grid item xs={7} className={classes.gridHeight}>
              <ShiftToolbar />
              <ShiftFilter />
              <div
                style={{
                  flex: '1 1 auto'
                }}
              >
                <ShiftIndex />
              </div>
              <ShiftTotal />
            </Grid>
            <Grid item xs={5} className={classes.gridHeight}>
              <ShiftCRUD />
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

Analyze.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openSettings: PropTypes.func.isRequired,
  openExport: PropTypes.func.isRequired,
  getShiftsInRange: PropTypes.func.isRequired,
  getAllEmployees: PropTypes.func.isRequired,
  getAllProjects: PropTypes.func.isRequired,
  getAllTasks: PropTypes.func.isRequired
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    openExport: () => {
      return dispatch(analyzeActions.exportDataModal());
    },
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

export default connect(
  null,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Analyze)));
