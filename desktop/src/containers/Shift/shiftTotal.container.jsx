import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { shiftSelectors } from '~/store/selectors'
import { Typography } from '@material-ui/core'
import moment from 'moment'
import { uniq } from 'lodash'

export class ShiftTotal extends Component {
  render() {
    const { shiftTotal, shifts } = this.props

    const projectNumbers = uniq(
      (shifts || [])
        .flatMap((shift) => shift.activities || [])
        .map((activity) => activity.projectTask?.project?.name?.match(/\d+/))
        .filter(Boolean)
        .map((numberOption) => numberOption[0]),
    ).sort()

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
        <div className="flex">
          {projectNumbers.map((prj) => (
            <p key={prj} className="m-2">
              {prj}
            </p>
          ))}
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
}

/* istanbul ignore next */
const mapStateToProps = (state) => ({
  shiftTotal: shiftSelectors.getShiftTotals(state),
  shifts: shiftSelectors.getAllShiftsNew(state),
})

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ShiftTotal)
