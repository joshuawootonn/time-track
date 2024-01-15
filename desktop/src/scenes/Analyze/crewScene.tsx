import React, { Component } from 'react'
import { connect } from 'react-redux'

import { AppBar, Toolbar, Tooltip, IconButton, Fab } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'

import Select from 'react-select'

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
import { Crew, Employee } from '~/types'
import { DateInLastMonth } from '~/components/inputs'

type CrewProps = {
  getAllEmployees: () => Promise<void>
  getAllProjects: () => Promise<void>
  getAllTasks: () => Promise<void>
  getShiftsInRange: (start: string, end: string) => Promise<void>
  crews: Crew[]
  currentEmployee: Employee
  updateFilter: (id: number) => void
}

type SelectableData = {
  name: string
}

type SelectValue<T extends SelectableData> = T & {
  data: T
  label: string
  value: string
}

function toSelectValue<T extends SelectableData>(data: T) {
  return {
    ...data,
    value: data.name,
    label: data.name,
    data,
  }
}

type CrewState = {
  day: string
  isLoading: boolean
  selectedCrew: SelectValue<Crew> | null
}

export class CrewScene extends Component<CrewProps, CrewState> {
  constructor(props: CrewProps) {
    super(props)

    const crew = props.crews.find(
      (crew) => crew.id === props.currentEmployee.crewId,
    )

    this.state = {
      day: moment.utc(moment().subtract(1, 'day')).local().format('YYYY-MM-DD'),
      isLoading: true,
      selectedCrew: crew ? toSelectValue(crew) : null,
    }
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

  back = () => {
    window.history.back()
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="flex flex-col w-screen h-[100svh] justify-center items-center ">
          <Progress variant="circular" fullWidth fullHeight />
        </div>
      )
    }

    const { crews } = this.props
    return (
      <div className="w-screen h-[100svh] flex flex-col space-y-4 md:space-y-0">
        <AppBar position="static" elevation={0}>
          <Toolbar disableGutters className="min-h-0 mx-4 space-x-4">
            <DateInLastMonth
              className={'w-1/4'}
              value={this.state.day}
              onChange={(day) => this.setState({ day })}
            />
            <Select
              value={this.state.selectedCrew}
              onChange={(selectedCrew) => {
                if (selectedCrew == null) return

                this.props.updateFilter(selectedCrew.id)
                return this.setState({ selectedCrew })
              }}
              options={crews.map((item) => toSelectValue(item))}
              className="text-slate-900 py-4 flex-grow"
            />
            <Tooltip title="Go Back" placement="bottom">
              <div className="hidden md:block">
                <IconButton color="inherit" onClick={this.back}>
                  <ArrowBack />
                </IconButton>
              </div>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <div>
          {this.state.selectedCrew ? (
            <CrewMemberShiftCard
              day={this.state.day}
              selectedCrew={this.state.selectedCrew}
            />
          ) : (
            <div>No crew selected</div>
          )}
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

const mapStateToProps = (state: any) => {
  return {
    crews: crewSelectors.getAllCrews(state),
    selected: crewSelectors.getSelectedCrew(state),
    currentEmployee: employeeSelectors.getCurrentEmployee(state),
  }
}

const mapDispatchToProps = (dispatch: any) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(CrewScene)
