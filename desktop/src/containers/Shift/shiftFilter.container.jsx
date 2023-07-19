import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Formik } from 'formik'
import { Card } from '@material-ui/core'
import moment from 'moment'

import Shift from '~/components/forms/Shift/Filter'

import {
  crewSelectors,
  employeeSelectors,
  projectSelectors,
  taskSelectors,
} from '~/store/selectors'
import { analyzeActions, shiftActions } from '~/store/actions'

import domain from '~/constants/domains'

export class ShiftFilter extends Component {
  render() {
    const {
      employees,
      projects,
      crews,
      tasks,
      shiftFilters,
      shiftFilterVisible,
      clearFilter,
      getShifts,
      updateFilter,
      toggleFilter,
    } = this.props

    if (shiftFilterVisible) {
      return (
        <Formik
          enableReinitialize
          initialValues={{
            ...shiftFilters,
            startTime: moment(
              shiftFilters.startTime,
              `MM-DD-YY HH:mm:ss`,
            ).format(`YYYY-MM-DDTHH:mm`),
            endTime: moment(shiftFilters.endTime, `MM-DD-YY HH:mm:ss`).format(
              `YYYY-MM-DDTHH:mm`,
            ),
          }}
          onSubmit={async (values, formikFunctions) => {
            const formattedValues = {
              ...values,
              startTime: moment(values.startTime, `YYYY-MM-DDTHH:mm`).format(
                `MM-DD-YY HH:mm:ss`,
              ),
              endTime: moment(values.endTime, `YYYY-MM-DDTHH:mm`).format(
                `MM-DD-YY HH:mm:ss`,
              ),
            }
            await getShifts(formattedValues)
            toggleFilter()
            updateFilter(formattedValues)
            formikFunctions.resetForm()
          }}
          render={(formikProps) => {
            return (
              <Card
                style={{
                  position: `absolute`,
                  top: `70px`,
                  left: `2.5%`,
                  zIndex: 900,
                  width: `95%`,
                  minHeight: `100px`,
                }}
              >
                <Shift
                  employees={[{ id: -1, type: `All` }, ...employees]}
                  crews={[{ id: -1, name: `All` }, ...crews]}
                  projects={[{ id: -1, name: `All` }, ...projects]}
                  tasks={[{ id: -1, type: `All` }, ...tasks]}
                  label="Filter"
                  type="filter"
                  clearFilter={clearFilter}
                  {...formikProps}
                />
              </Card>
            )
          }}
        />
      )
    }
    return null
  }
}

/* istanbul ignore next */
const mapStateToProps = (state) => {
  return {
    shiftFilters: state.analyze.shiftFilters,
    shiftFilterVisible: state.analyze.shiftFilterVisible,
    employees: employeeSelectors.getAllEmployees(state),
    projects: projectSelectors.getActiveProjects(state),
    crews: crewSelectors.getAllCrews(state),
    tasks: taskSelectors.getAllTasks(state),
  }
}

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => {
  return {
    getShifts: (filters) => dispatch(shiftActions.getShifts(filters)),
    updateFilter: (filters) =>
      dispatch(analyzeActions.updateFilter(domain.SHIFT, filters)),
    clearFilter: () => dispatch(analyzeActions.clearFilter(domain.SHIFT)),
    toggleFilter: () => dispatch(analyzeActions.toggleFilter(domain.SHIFT)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShiftFilter)
