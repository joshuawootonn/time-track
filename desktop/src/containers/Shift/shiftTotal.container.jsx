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

export class ShiftTotal extends Component {
  updateFilter = (partial) =>
    this.props.updateFilter({ ...this.props.shiftFilters, ...partial })

  render() {
    const { shiftTotal, shifts } = this.props

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
    const content = `${Math.floor(length / 60)}h ${length % 60}m`
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
        <div className="flex space-x-2">
          {projects.map((project) => {
            const projectNumber = project.name.match(/\d+/)?.[0]

            return (
              projectNumber && (
                <Tooltip interactive key={project.id} title={project.name}>
                  <Link
                    component="button"
                    size="small"
                    onClick={() => this.updateFilter({ projectId: project.id })}
                  >
                    {projectNumber}
                  </Link>
                </Tooltip>
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
