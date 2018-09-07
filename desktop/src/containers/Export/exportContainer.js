import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Formik } from 'formik'

import Export from 'components/forms/Export'

import { exportActions } from 'store/actions'

class ExportContainer extends Component {
  cancel = () => {
    this.props.history.goBack();
  }
  render() {
    return (
      <Formik
        initialValues={{
          exportBy: 1,
          from: new Date().toString(),
          for: 1,
          length: 1
        }}
        onSubmit={values => {
          const {exportToExcel,history} = this.props;
          exportToExcel("exportBy","from","type","length")
            .then(() => history.push('/'))
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

const mapDispatchToProps = (dispatch) => {
  return {
    exportToExcel: (exportBy, from, type, length) => {
      return dispatch(exportActions.exportToExcel(exportBy, from, type, length))
    }
  }
}

export default withRouter(
  connect(null, mapDispatchToProps)(ExportContainer))