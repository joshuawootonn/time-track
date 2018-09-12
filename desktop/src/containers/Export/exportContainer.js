import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Formik } from 'formik'
import moment from 'moment'

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
          exportBy: 0,
          from: moment().format('YYYY-MM-DD'),
          type: 0,
          length: 0,
          file: ""
        }}
        onSubmit={values => {
          const {exportToExcel,history} = this.props;
          console.log(values)
          const {exportBy,from,type,length,file} = values
          exportToExcel(exportBy,from,type,length,file)
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
    exportToExcel: (exportBy, from, type, length,file) => {
      return dispatch(exportActions.exportToExcel(exportBy, from, type, length,file))
    }
  }
}

export default withRouter(
  connect(null, mapDispatchToProps)(ExportContainer))