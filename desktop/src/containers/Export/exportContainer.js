import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import { Formik } from 'formik'

import Export from 'components/forms/Export'

class ExportContainer extends Component {
  render() {
    console.log(this.props.history.location)
    return (
        <Formik
          initialValues={{
            exportBy: 1,
            from: new Date().toString(),
            for: 1,
            length: 1
          }}
          onSubmit={values => {
            console.log("Export submitted")
          }}
          render={formikProps => {
              return (
                <Export
                  {...formikProps}
                />
              )
            }} 
          />
    )
  }
}

export default withRouter(ExportContainer)