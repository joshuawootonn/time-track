import React, { Component } from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Formik } from 'formik'
import moment from 'moment'

import Export from '~/components/forms/Export'

import { exportValidation } from '~/constants/formValidation'
import { exportActions } from '~/store/actions'
import { exportToCSV } from '~/store/Export/actions'

export class ExportContainerCSV extends Component {
  cancel = () => {
    window.history.back()
  }
  startOfDay = (start) => {
    return moment(start, `YYYY-MM-DD`).startOf('day')
  }
  endOfDay = (end) => {
    return moment(end, `YYYY-MM-DD`).endOf('day')
  }
  render() {
    return (
      <Formik
        initialValues={{
          start: moment()
            .subtract('days', 7)
            .startOf(`week`)
            .subtract('day')
            .format(`YYYY-MM-DD`),
          end: moment().subtract('days', 7).endOf(`week`).format(`YYYY-MM-DD`),
          timeLength: 0,
          timeLengthType: 0,
          fileLocation: ``,
        }}
        onSubmit={(values) => {
          const { exportToCSV, history } = this.props
          const { start, end, fileLocation } = values
          return exportToCSV(start, end, fileLocation).then(() =>
            history.push(`/`),
          )
        }}
        validationSchema={exportValidation}
        render={(formikProps) => {
          return <Export cancel={this.cancel} {...formikProps} />
        }}
      />
    )
  }
}

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => {
  return {
    exportToCSV: (start, end, fileLocation) => {
      return dispatch(exportActions.exportToCSV(start, end, fileLocation))
    },
  }
}

export default withRouter(connect(null, mapDispatchToProps)(ExportContainerCSV))
