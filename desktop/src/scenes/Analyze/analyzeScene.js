import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { AppBar, Tabs, Tab, IconButton,Toolbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {ArrowBack} from '@material-ui/icons'

import EmployeeContainer from 'containers/Analyze/employeesContainer';
import ProjectContainer from 'containers/Analyze/projectsContainer';
import ShiftContainer from 'containers/Analyze/shiftsContainer';

const styles = {
  grow: {
    flexGrow: 1,
  },
  tool: {
    minHeight: 0
  }
};

class AuthScene extends Component {
  state = {
    tabValue: 0
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
    console.log(this.props.history);
    return (
      <div>
        <AppBar position="static">
          <Toolbar className={classes.tool}>
            <Tabs value={tabValue} onChange={this.handleTabValueChange} className={classes.grow}>
              <Tab label="Employees" />
              <Tab label="Projects" />
              <Tab label="Shifts" />
            </Tabs>
            <IconButton color="inherit" onClick={this.back}><ArrowBack /></IconButton>
          </Toolbar>

        </AppBar>
        {tabValue === 0 && <EmployeeContainer />}
        {tabValue === 1 && <ProjectContainer />}
        {tabValue === 2 && <ShiftContainer />}
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(AuthScene));