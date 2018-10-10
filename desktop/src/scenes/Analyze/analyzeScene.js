import React, { Component } from 'react'

import { AppBar, Tabs, Tab } from '@material-ui/core';

import EmployeeContainer from 'containers/Analyze/employeesContainer'
import ProjectContainer from 'containers/Analyze/projectsContainer'
import ShiftContainer from 'containers/Analyze/shiftsContainer';

class AuthScene extends Component {
  state = {
    tabValue: 0
  }
  handleTabValueChange = (e, tabValue) => {
    this.setState({ tabValue })
  }
  render() {
    const { tabValue } = this.state;
    return (
      <div>
        <AppBar position="static">
          <Tabs value={tabValue} onChange={this.handleTabValueChange}>
            <Tab label="Employees" />
            <Tab label="Projects" />
            <Tab label="Shifts" />
          </Tabs>
        </AppBar>
        {tabValue === 0 && <EmployeeContainer />}
        {tabValue === 1 && <ProjectContainer />}
        {tabValue === 2 && <ShiftContainer />}
      </div>
    )
  }
}

export default AuthScene