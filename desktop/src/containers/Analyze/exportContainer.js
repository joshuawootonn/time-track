import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Formik } from 'formik';
import moment from 'moment';

import Export from 'components/forms/Export';

import { exportValidation } from 'constants/formValidation';
import { exportActions } from 'store/actions';

export class ExportContainer extends Component {
  
  render() {
    return (
      <Formik
        initialValues={{
          exportCategory: 0,
          start: moment().startOf(`isoWeek`).subtract(1,`day`).format(`YYYY-MM-DD`),
          timeLength: 0,
          timeLengthType: 0,
          fileLocation: ``
        }}
        onSubmit={values => {
          const { exportToExcel, toggleModal } = this.props;
          const { exportCategory, start, fileLocation } = values;
          return exportToExcel(exportCategory, start, fileLocation)
            .then(() => toggleModal());
        }}
        validationSchema={exportValidation}
        render={formikProps => {
          return <Export cancel={this.cancel} {...formikProps} />;
        }}
      />
    );
  }
}

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    exportToExcel: (exportCategory, start, fileLocation ) => {
      return dispatch(exportActions.exportToExcel(exportCategory, start, fileLocation));
    }
  };
};

export default connect(null,mapDispatchToProps)(ExportContainer);
