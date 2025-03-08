import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import {
  AppBar,
  Tabs,
  Tab,
  IconButton,
  Toolbar,
  Grid,
  Tooltip,
  Drawer,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import {
  ArrowBack,
  Settings,
  Menu,
  Storage,
  AssignmentReturned,
  BorderBottom,
} from '@material-ui/icons'
import moment from 'moment'
import { withMediaQuery } from '~/helpers/withMediaQuery'

import {
  employeeActions,
  projectActions,
  taskActions,
  shiftActions,
  analyzeActions,
} from '~/store/actions'

import EmployeeCRUD from '~/containers/Employee/employeeCRUD.container'
import EmployeeIndex from '~/containers/Employee/employeeIndex.container'
import EmployeeFilter from '~/containers/Employee/employeeFilter.container'
import EmployeeToolbar from '~/containers/Employee/employeeToolbar.container'

import TaskCRUD from '~/containers/Task/taskCRUD.container'
import TaskIndex from '~/containers/Task/taskIndex.container'
import TaskToolbar from '~/containers/Task/taskToolbar.container'
import TaskFilter from '~/containers/Task/taskFilter.container'

import ProjectToolbar from '~/containers/Project/projectToolbar.container'
import ProjectFilterContainer from '~/containers/Project/projectFilter.container'
import ProjectCRUD from '~/containers/Project/projectCRUD.container'
import ProjectIndex from '~/containers/Project/projectIndex.container'

import ShiftToolbar from '~/containers/Shift/shiftToolbar.container'
import ShiftIndex from '~/containers/Shift/shiftIndex.container'
import ShiftFilter from '~/containers/Shift/shiftFilter.container'
import ShiftCRUD from '~/containers/Shift/shiftCRUD.container'
import ShiftTotal from '~/containers/Shift/shiftTotal.container'
import Progress from '~/components/helpers/Progress'
import isElectron from '~/helpers/IsElectron'

const styles = (theme) => ({
  root: {
    height: `100vh`,
  },
  tab: {
    height: `calc(100% - 48px)`,
    display: `flex`,
  },
  tabs: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
  tool: {
    minHeight: 0,
    justifyContent: 'space-between',
  },
  gridHeight: {
    minHeight: '65vh',
    position: `relative`,
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid rgba(224, 224, 224, 1)',
    borderBottom: '3px solid rgba(224, 224, 224, 1)',
  },
})

const TabIndex = {
  Employees: 0,
  Projects: 1,
  Tasks: 2,
  Shifts: 3,
}

export class Analyze extends Component {
  //REMOVE
  state = {
    tabValue: 3,
    isLoading: true,
    isElectron: isElectron(),
    isMenuOpened: false,
  }
  componentDidMount = async () => {
    Promise.all([
      this.props.getAllEmployees(),
      this.props.getAllProjects(),
      this.props.getAllTasks(),
      this.props.getShiftsInRange(
        moment().subtract(365, `days`).format(`MM-DD-YY HH:mm:ss`),
        moment().add(14, `days`).format(`MM-DD-YY HH:mm:ss`),
      ),
    ]).then(() => {
      this.setState({ ...this.state, isLoading: false })
    })
  }

  handleTabValueChange = (e, tabValue) => {
    this.setState({ ...this.state, tabValue, isMenuOpened: false })
  }

  back = () => {
    window.history.back()
  }

  goToTab = (number) => {
    this.setState({ ...this.state, tabValue: number })
  }

  toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    this.setState({ ...this.state, isMenuOpened: open })
  }

  render() {
    const { tabValue } = this.state
    const { classes, isDesktop = false } = this.props

    if (this.state.isLoading)
      return (
        <div className={classes.root}>
          <Progress variant="circular" fullWidth fullHeight />
        </div>
      )

    return (
      <div className={classes.root}>
        <AppBar
          position="static"
          elevation={0}
          className={classes.desktop}
          style={{}}
        >
          <Toolbar className={classes.tool}>
            <div className="leftSide">
              {isDesktop ? (
                <Tabs
                  value={tabValue}
                  onChange={this.handleTabValueChange}
                  className={classes.tabs}
                >
                  <Tab label="Employees" />
                  <Tab label="Projects" />
                  <Tab label="Tasks" />
                  <Tab label="Shifts" />
                </Tabs>
              ) : (
                <>
                  <Tooltip title="Menu" placement="bottom">
                    <IconButton
                      color="inherit"
                      onClick={this.toggleDrawer(true)}
                    >
                      <Menu />
                    </IconButton>
                  </Tooltip>
                  <Drawer
                    anchor="left"
                    open={this.state.isMenuOpened}
                    onClose={this.toggleDrawer(false)}
                  >
                    <Tabs
                      value={tabValue}
                      orientation="vertical"
                      variant="scrollable"
                      onChange={this.handleTabValueChange}
                      className={classes.tabs}
                    >
                      <Tab label="Employees" />
                      <Tab label="Projects" />
                      <Tab label="Tasks" />
                      <Tab label="Shifts" />
                    </Tabs>
                  </Drawer>
                </>
              )}
            </div>

            <div className="rightSide">
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
            </div>
          </Toolbar>
        </AppBar>

        {tabValue === TabIndex.Employees && (
          <Grid
            container
            className={isDesktop ? classes.tab : classes.tabMobile}
          >
            <Grid item xs={isDesktop ? 6 : 12} className={classes.gridHeight}>
              <EmployeeToolbar />
              <EmployeeFilter />
              <div
                style={{
                  flex: '1 1 auto',
                }}
              >
                <EmployeeIndex />
              </div>
            </Grid>
            <Grid item xs={isDesktop ? 6 : 12} className={classes.gridHeight}>
              <EmployeeCRUD />
            </Grid>
          </Grid>
        )}

        {tabValue === TabIndex.Projects && (
          <Grid
            container
            className={isDesktop ? classes.tab : classes.tabMobile}
          >
            <Grid item xs={isDesktop ? 5 : 12} className={classes.gridHeight}>
              <ProjectToolbar />
              <ProjectFilterContainer />
              <div
                style={{
                  flex: '1 1 auto',
                }}
              >
                <ProjectIndex />
              </div>
            </Grid>
            <Grid item xs={isDesktop ? 7 : 12}>
              <ProjectCRUD goToTab={this.goToTab} />
            </Grid>
          </Grid>
        )}

        {tabValue === TabIndex.Tasks && (
          <Grid
            container
            className={isDesktop ? classes.tab : classes.tabMobile}
          >
            <Grid item xs={isDesktop ? 6 : 12} className={classes.gridHeight}>
              <TaskToolbar />
              <TaskFilter />
              <div
                style={{
                  flex: '1 1 auto',
                }}
              >
                <TaskIndex />
              </div>
            </Grid>
            <Grid item xs={isDesktop ? 6 : 12}>
              <TaskCRUD />
            </Grid>
          </Grid>
        )}

        {tabValue === TabIndex.Shifts && (
          <Grid
            container
            className={isDesktop ? classes.tab : classes.tabMobile}
          >
            <Grid item xs={isDesktop ? 7 : 12} className={classes.gridHeight}>
              <ShiftToolbar />
              <ShiftFilter />
              <div
                style={{
                  flex: '1 1 auto',
                }}
              >
                <ShiftIndex />
              </div>
              <ShiftTotal />
            </Grid>
            <Grid item xs={isDesktop ? 5 : 12} className={classes.gridHeight}>
              <ShiftCRUD />
            </Grid>
          </Grid>
        )}
      </div>
    )
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
  getAllTasks: PropTypes.func.isRequired,
}

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => {
  return {
    openExport: () => {
      return dispatch(analyzeActions.exportDataModal())
    },
    openSettings: () => {
      return dispatch(analyzeActions.editSettingsModal())
    },
    getAllEmployees: () => {
      return dispatch(employeeActions.getAllEmployees())
    },
    getAllProjects: () => {
      return dispatch(projectActions.getAllProjects())
    },
    getAllTasks: () => {
      return dispatch(taskActions.getAllTasks())
    },
    getShiftsInRange: (start, end) => {
      return dispatch(shiftActions.getShiftsInRange(start, end))
    },
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(
  withRouter(
    withStyles(styles)(
      withMediaQuery([
        [
          'isDesktop',
          `(min-width: 800px)`,
          {
            defaultMatches: true,
          },
        ],
      ])(Analyze),
    ),
  ),
)
