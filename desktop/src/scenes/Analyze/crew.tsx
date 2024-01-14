import React, { Component, useState } from 'react'
import { connect } from 'react-redux'

import { AppBar, Toolbar, Tooltip, IconButton, Fab } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'

import Select from 'react-select'

import Day from '~/components/inputs/Day'
import CrewMemberShiftCard from '~/components/crewCards/crewMemberShiftCard'
import Progress from '~/components/helpers/Progress'

import {
  foremanActions,
  employeeActions,
  projectActions,
  taskActions,
  shiftActions,
} from '~/store/actions'
import { crewActions } from '~/store/actions'
import { crewSelectors, employeeSelectors } from '~/store/selectors'

import moment from 'moment'

interface CrewProps {
  getAllEmployees: () => Promise<void>
  getAllProjects: () => Promise<void>
  getAllTasks: () => Promise<void>
  getShiftsInRange: (start: string, end: string) => Promise<void>
}

interface CrewState {
  day: string
  isLoading: boolean
}

export class Crew extends Component<CrewProps, CrewState> {
  constructor(props) {
    super(props)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    this.state = {
      day: moment.utc(yesterday).local().format('YYYY-MM-DD'),
      isLoading: true,
    }
    this.setDay = this.setDay.bind(this)
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

  setDay = (day) => {
    this.setState({ day })
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.currentEmployee !== this.props.currentEmployee) {
      var employeecrew = this.props.crews.find(
        (crew) => crew.id === this.props.currentEmployee.crewId,
      )
      this.state.selectedCrew = {
        label: employeecrew.name,
        value: employeecrew.name,
        id: employeecrew.id,
        data: {},
        name: employeecrew.name,
      }
    }
  }

  back = () => {
    window.history.back()
  }
  render() {
    if (this.state.isLoading)
      return (
        <div>
          <Progress variant="circular" fullWidth fullHeight />
        </div>
      )
    const { crews } = this.props
    return (
      <div className="w-screen h-full flex flex-col space-y-4 md:space-y-0">
        <AppBar position="static" elevation={0}>
          <Toolbar disableGutters className="min-h-0 mx-4 space-x-4">
            <Day value={this.state.day} onChange={this.setDay} />
            <Select
              value={this.state.selectedCrew}
              onChange={(selectedCrew) => {
                this.props.updateFilter(selectedCrew.id)
                return this.setState({ selectedCrew })
              }}
              options={crews.map((item) => {
                return {
                  label: item.name,
                  value: item.name,
                  id: item.id,
                  data: { ...item },
                  name: item.name,
                }
              })}
              className="text-slate-900 py-4 flex-grow"
            />
            <Tooltip title="Go Back" placement="bottom">
              <div className="hidden md:block">
                <IconButton
                  color="inherit"
                  onClick={this.back}
                >
                  <ArrowBack />
                </IconButton>
              </div>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <div>
          <CrewMemberShiftCard
            day={this.state.day}
            selectedCrew={this.state.selectedCrew}
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

const mapStateToProps = (state) => {
  return {
    crews: crewSelectors.getAllCrews(state),
    selected: crewSelectors.getSelectedCrew(state),
    currentEmployee: employeeSelectors.getCurrentEmployee(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCrews: () => dispatch(crewActions.getAllCrews()),
    updateFilter: (id: number) => dispatch(foremanActions.updateFilter(id)),
    getAllEmployees: () => {
      return dispatch(employeeActions.getAllEmployees())
    },
    getAllProjects: () => {
      return dispatch(projectActions.getAllProjects())
    },
    getAllTasks: () => {
      return dispatch(taskActions.getAllTasks())
    },
    getShiftsInRange: (start: string, end: string) => {
      return dispatch(shiftActions.getShiftsInRange(start, end))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Crew)
