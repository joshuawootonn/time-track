import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { analyzeActions } from '~/store/actions'
import { shiftSelectors } from '~/store/selectors'
import domain from '~/constants/domains'
import { Typography } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import Tooltip from '@material-ui/core/Tooltip'
import moment from 'moment'
import { sortBy, uniqBy } from 'lodash'

export const getMinutesByProject = (shifts) =>
  (shifts || [])
    .flatMap((shift) => shift.activities || [])
    .reduce((totals, activity) => {
      const projectId = activity.projectTask?.project?.id
      if (projectId === undefined) return totals
      totals[projectId] = (totals[projectId] || 0) + (activity.length || 0)
      return totals
    }, {})

const formatMinutes = (minutes) =>
  `${Math.floor(minutes / 60)}h ${minutes % 60}m`

export class ShiftTotal extends Component {
  updateFilter = (partial) =>
    this.props.updateFilter({ ...this.props.shiftFilters, ...partial })

  render() {
    const { shiftTotal, shifts } = this.props

    const minutesByProject = getMinutesByProject(shifts)

    const projects = sortBy(
      uniqBy(
        (shifts || [])
          .flatMap((shift) => shift.activities || [])
          .map((activity) => activity.projectTask?.project)
          .filter(Boolean),
        'id',
      ),
      [(project) => project.name],
    )

    const length = moment.duration(shiftTotal, `minutes`).asMinutes()
    const content = formatMinutes(length)
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          minHeight: '64px',
          borderTop: '1px solid rgba(224, 224, 224, 1)',
        }}
        className="MuiToolbar-gutters"
      >
        <div />
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {projects.map((project) => {
            const projectNumber = project.name.match(/\d+/)?.[0]

            return (
              projectNumber && (
                <span key={project.id}>
                  <Tooltip interactive title={project.name}>
                    <Link
                      component="button"
                      size="small"
                      onClick={() =>
                        this.updateFilter({ projectId: project.id })
                      }
                    >
                      <span className="whitespace-nowrap">
                        <span className="font-bold">{projectNumber}</span> (
                        {formatMinutes(minutesByProject[project.id] || 0)})
                      </span>
                    </Link>
                  </Tooltip>{' '}
                </span>
              )
            )
          })}
        </div>
        <Typography variant="h6" id="tableTitle">
          Total: {content}
        </Typography>
      </div>
    )
  }
}

ShiftTotal.propTypes = {
  shiftTotal: PropTypes.any,
  shifts: PropTypes.any,
  shiftFilters: PropTypes.object,
  updateFilter: PropTypes.func.isRequired,
}

/* istanbul ignore next */
const mapStateToProps = (state) => ({
  shiftTotal: shiftSelectors.getShiftTotals(state),
  shifts: shiftSelectors.getAllShiftsNew(state),
  shiftFilters: shiftSelectors.getShiftFilters(state),
})

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => ({
  updateFilter: (filters) =>
    dispatch(analyzeActions.updateFilter(domain.SHIFT, filters)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShiftTotal)
