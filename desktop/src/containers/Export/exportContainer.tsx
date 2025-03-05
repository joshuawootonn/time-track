import React, { Component, useState } from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Formik } from 'formik'
import moment from 'moment'

import Export from '~/components/forms/Export'

import { exportValidation } from '~/constants/formValidation'
import { exportActions } from '~/store/actions'
import { FileFormat } from '~/components/inputs/File/file'

type Props = {
  exportToExcel: any
  exportToCSV: any
  onSubmit: () => void
  onCancel?: () => void
}

function ExportContainer({
  exportToExcel,
  exportToCSV,
  onCancel,
  onSubmit,
}: Props) {
  const [format, setFormat] = useState<FileFormat>('excel')

  function startOfDay(start: any) {
    return moment(start, `YYYY-MM-DD`).startOf('day')
  }

  function endOfDay(end: any) {
    return moment(end, `YYYY-MM-DD`).endOf('day')
  }

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
      onSubmit={async (values) => {
        const { start, end, fileLocation } = values
        const actualStart = startOfDay(start)
        const actualEnd = endOfDay(end)

        if (format === 'excel') {
          await exportToExcel(actualStart, actualEnd, fileLocation)
        } else if (format === 'csv') {
          await exportToCSV(actualStart, actualEnd, fileLocation)
        } else {
          console.error(`Unknown format ${format}`)
        }

        onSubmit()
      }}
      validationSchema={exportValidation}
      render={(formikProps) => {
        return (
          <Export
            format={format}
            onFormatChange={setFormat}
            cancel={onCancel}
            {...formikProps}
          />
        )
      }}
    />
  )
}

/* istanbul ignore next */
const mapDispatchToProps = (dispatch: any) => {
  return {
    exportToExcel: (start: any, end: any, fileLocation: string) => {
      return dispatch(exportActions.exportToExcel(start, end, fileLocation))
    },

    exportToCSV: (start: any, end: any, fileLocation: string) => {
      return dispatch(exportActions.exportToCSV(start, end, fileLocation))
    },
  }
}

// @ts-expect-error: types
export default withRouter(connect(null, mapDispatchToProps)(ExportContainer))
