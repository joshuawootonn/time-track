import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

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
import { ArrowBack, Menu } from '@material-ui/icons'
import { withMediaQuery } from '~/helpers/withMediaQuery'
import * as TableDataTypes from '~/constants/tableDataTypes'

import { projectActions } from '~/store/actions'

import ProjectIndex from '~/containers/Project/projectIndex.container'
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
  CurrentProjects: 0,
}

const columnsCurrentProjects = [
  {
    id: `name`,
    dataKey: `name`,
    width: 200,
    height: 56,
    padding: `dense`,
    label: `Name`,
    type: TableDataTypes.STRING,
  },
  {
    id: `isActive`,
    dataKey: `isActive`,
    width: 120,
    flexGrow: 0,
    height: 56,
    padding: `dense`,
    label: `Active`,
    type: TableDataTypes.PROJECT_ACTIVE,
  },
]

export class AnalyzeForeman extends Component {
  //REMOVE
  state = {
    tabValue: 0,
    isLoading: true,
    isElectron: isElectron(),
    isMenuOpened: false,
  }
  componentDidMount = async () => {
    Promise.all([this.props.getAllProjects()]).then(() => {
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
                  <Tab label="Activate Projects" />
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
                      <Tab label="Activate Projects" />
                    </Tabs>
                  </Drawer>
                </>
              )}
            </div>

            <div className="rightSide">
              <Tooltip title="Go Back" placement="bottom">
                <IconButton color="inherit" onClick={this.back}>
                  <ArrowBack />
                </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
        </AppBar>

        {tabValue === TabIndex.CurrentProjects && (
          <Grid
            container
            className={isDesktop ? classes.tab : classes.tabMobile}
          >
            <Grid item xs={isDesktop ? 5 : 12} className={classes.gridHeight}>
              <ProjectIndex
                columns={columnsCurrentProjects}
                forceCurrent={true}
              />
            </Grid>
          </Grid>
        )}
      </div>
    )
  }
}

AnalyzeForeman.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  getAllProjects: PropTypes.func.isRequired,
}

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => {
  return {
    getAllProjects: () => {
      return dispatch(projectActions.getAllProjects())
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
      ])(AnalyzeForeman),
    ),
  ),
)
