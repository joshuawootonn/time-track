import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AppBar, Tabs, Tab, IconButton,Toolbar,Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ArrowBack } from '@material-ui/icons';

import EmployeeDetailsContainer from 'containers/Analyze/employeeDetailsContainer';
import EmployeeIndexContainer from 'containers/Analyze/employeeIndexContainer';
import TaskDetailsContainer from 'containers/Analyze/taskDetailsContainer';
import TaskIndexContainer from 'containers/Analyze/taskIndexContainer';
import projectDetailContainer from 'containers/Analyze/projectDetailContainer';
import ProjectIndexContainer from 'containers/Analyze/projectIndexContainer';
import ShiftIndexContainer from 'containers/Analyze/shiftIndexContainer';
import ShiftDetailsContainer from 'containers/Analyze/shiftDetailsContainer';

const styles = {
  grow: {
    flexGrow: 1
  },
  tool: {
    minHeight: 0
  }
};

export class Analyze extends Component {

  state = {
    tabValue: 1
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
      <div>
        <AppBar position="static">
          <Toolbar className={classes.tool}>
            <Tabs value={tabValue} onChange={this.handleTabValueChange} className={classes.grow}>
              <Tab label="Employees" />
              <Tab label="Projects" />              
              <Tab label="Tasks" />
              <Tab label="Shifts" />
            </Tabs>
            <IconButton color="inherit" onClick={this.back}><ArrowBack /></IconButton>
          </Toolbar>

        </AppBar>
        {tabValue === 0 && <Grid container>
          <Grid item xs={7}>
            <EmployeeIndexContainer />
          </Grid>
          <Grid item xs={5}>
            <EmployeeDetailsContainer />
          </Grid>
        </Grid>}
        {tabValue === 1 && <Grid container>
          <Grid item xs={4}>
            <ProjectIndexContainer />
          </Grid>
          <Grid item xs={8}>
            <projectDetailContainer />
          </Grid>
        </Grid>}
        {tabValue === 2 && <Grid container>
          
          <Grid item xs={7}>
            <TaskIndexContainer />
          </Grid>
          <Grid item xs={5}>
            <TaskDetailsContainer />
          </Grid>
        </Grid>}
        {tabValue === 3 && <Grid container>
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
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Analyze));