import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { shiftSelectors } from '~/store/selectors'
import { Typography } from '@material-ui/core'
import moment from 'moment'

export class ShiftTotal extends Component {
  render() {
    const { shiftTotal } = this.props

    if (!shiftTotal) return null

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
        <Typography variant="h6" id="tableTitle">
          Total: {content}
        </Typography>
      </div>
    )
  }
}

ShiftTotal.propTypes = {
  shiftTotal: PropTypes.any,
}

/* istanbul ignore next */
const mapStateToProps = (state) => ({
  shiftTotal: shiftSelectors.getShiftTotals(state),
})

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ShiftTotal)
