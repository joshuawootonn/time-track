import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Select from 'react-select'

import { AppBar, IconButton, Toolbar, Tooltip } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { ArrowBack } from '@material-ui/icons'

import Fab from '@material-ui/core/Fab'

import PropTypes from 'prop-types'

import { foremanActions, projectActions } from '~/store/actions'
import { projectSelectors, projectTaskSelectors } from '~/store/selectors'
import { ForemanProjectSummary } from '~/containers/ForemanProject/projectSummary.container'

const styles = {
  root: {
    height: `100vh`,
    width: `100vw`,
  },
  tab: {
    height: `calc(100% - 48px)`,
    display: `flex`,
  },
  grow: {
    flexGrow: 1,
  },
  tool: {
    minHeight: 0,
  },
  gridHeight: {
    height: `auto`,
    position: `relative`,
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid rgba(224, 224, 224, 1)',
  },
}

export class ProjectScene extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedProject: undefined,
    }
  }

  back = () => {
    window.history.back()
  }

  render() {
    const { projects, updateFilter, selected } = this.props

    return (
      <div className="w-screen h-[100svh] flex flex-col space-y-4 md:space-y-0">
        <AppBar position="static" elevation={0}>
          <Toolbar disableGutters className="min-h-0 mx-4 space-x-4">
            <Select
              value={this.state.selectedProject}
              onChange={(selectedProject) => {
                updateFilter(selectedProject.id)
                console.log({ selected })
                console.log({ selectedProject })
                return this.setState({ selectedProject })
              }}
              options={projects.map((item) => {
                return {
                  label: item.name,
                  value: item.name,
                  id: item.id,
                  data: { ...item },
                }
              })}
              className="text-slate-900 py-4 flex-grow"
            />
            <Tooltip title="Go Back" placement="bottom">
              <IconButton
                className="!hidden md:!block"
                color="inherit"
                onClick={this.back}
              >
                <ArrowBack />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <div className="flex-grow flex justify-center items-start md:items-center">
          <ForemanProjectSummary
            selectedProject={
              this.state.selectedProject ? this.state.selectedProject.id : -1
            }
          />
        </div>
        <div className="fixed block md:hidden self-end bottom-4 right-4">
          <Fab color="primary" aria-label="add" onClick={this.back}>
            <ArrowBack />
          </Fab>
        </div>
      </div>
    )
  }
}

export const ANALYZE_SHIFT_FULL_SHIFT_PROJECT_FIELD_ID = `analyze_shift_full_shift_project_field`

ProjectScene.prototypes = {
  getAllProjects: PropTypes.func.isRequired,
}

/* istanbul ignore next */
const mapStateToProps = (state) => {
  return {
    // selectedProject: projectSelectors.(state)
    projects: projectSelectors.getActiveProjects(state),
    selectedProjectId: state.foreman.projectId,
    // selectedProject: projectSelectors.getProjectForemanView(state)
    selected: projectTaskSelectors.getSelectedProject(state),
  }
}

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => {
  return {
    getAllProjects: () => {
      return dispatch(projectActions.getAllProjects())
    },
    updateFilter: (projectId) => {
      return dispatch(foremanActions.updateFilter(projectId))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(withStyles(styles)(ProjectScene)))
