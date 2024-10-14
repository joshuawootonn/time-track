import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'

import { employeeActions, analyzeActions } from '~/store/actions'
import { employeeSelectors } from '~/store/selectors'
import * as routes from '~/constants/routes'
import AccountActionForm from '~/components/forms/AccountAction'
import domains from '~/constants/domains'
import { BaseEmployee, Store } from '~/store/types'
import { AUTH_LEVELS } from '~/constants/routes'
import isElectron from '~/helpers/IsElectron'

interface Props extends RouteComponentProps {
  clockIn: (employee: BaseEmployee) => Promise<any>
  employees: BaseEmployee[]
  employee: {
    current: {
      id?: number
      status: string
    }
  }
  type: AUTH_LEVELS
  currentEmployee: BaseEmployee
  clearFilters: () => void
}

interface State {
  isFullScreen: boolean
  isLoading: boolean
  isElectron: boolean
}

export class AccountAction extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isLoading: false,
      isFullScreen: true,
      isElectron: isElectron(),
    }
  }
  componentDidMount = () => {
    //REMOVE before deploy
    // this.props.history.push(`/${this.props.type}/${routes.ANALYZE}`);

    if (this.state.isElectron) {
      const isFullScreen = window.electronAPI.is_fullscreen()
      this.setState({
        isFullScreen,
      })
    }
  }
  back = () => {
    this.props.history.push(`/`)
  }
  clockIn = () => {
    this.props.history.push(`/${this.props.type}/${routes.CLOCKIN}`)
  }
  clockOut = () => {
    this.props.history.push(`/${this.props.type}/${routes.CLOCKOUT}`)
  }
  analyze = () => {
    this.props.clearFilters()
    this.props.history.push(`/${this.props.type}/${routes.ANALYZE}`)
  }
  crew = () => {
    this.props.clearFilters()
    this.props.history.push(`/${this.props.type}/${routes.CREW}`)
  }
  export = () => {
    this.props.history.push(`/${this.props.type}/${routes.EXPORT}`)
  }
  project = () => {
    this.props.clearFilters()
    this.props.history.push(`/${this.props.type}/${routes.PROJECTSUMMARY}`)
  }
  toggleFullscreen = () => {
    this.setState({
      isFullScreen: window.electronAPI.toggle_fullscreen(),
    })
  }
  render() {
    const { type, currentEmployee } = this.props
    return (
      <AccountActionForm
        isWorking={currentEmployee.isWorking}
        type={type}
        back={this.back}
        clockIn={this.clockIn}
        clockOut={this.clockOut}
        analyze={this.analyze}
        crew={this.crew}
        export={this.export}
        project={this.project}
        toggleFullscreen={this.toggleFullscreen}
        isFullScreen={this.state.isFullScreen}
        isElectron={this.state.isElectron}
      />
    )
  }
}

/* istanbul ignore next */
const mapDispatchToProps = (dispatch: any) => {
  return {
    clockIn: (employee: BaseEmployee) => {
      return dispatch(employeeActions.clockIn(employee.id))
    },
    clearFilters: () => {
      dispatch(analyzeActions.clearFilter(domains.EMPLOYEE))
      dispatch(analyzeActions.clearFilter(domains.PROJECT))
      dispatch(analyzeActions.clearFilter(domains.TASK))
      dispatch(analyzeActions.clearFilter(domains.SHIFT))
    },
  }
}

/* istanbul ignore next */
const mapStateToProps = (state: Store) => ({
  employee: state.employee,
  entities: state.entities,
  employees: employeeSelectors.getEmployeesFromEntities(state),
  currentEmployee: employeeSelectors.getCurrentEmployee(state),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AccountAction))
