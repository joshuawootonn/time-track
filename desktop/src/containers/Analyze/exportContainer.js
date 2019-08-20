import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Formik } from 'formik';
import moment from 'moment';

import Export from 'components/forms/Export';

import { exportValidation } from 'constants/formValidation';
import { exportActions } from 'store/actions';


// TODO: THERE SHOULD ONLY BE ONE CONTAINER
export class ExportContainer extends Component {
  startOfDay = (start) => {
    return moment(start,`YYYY-MM-DD`).startOf('day');
  }
  endOfDay = (end) => {
    return moment(end,`YYYY-MM-DD`).endOf('day');
  }
  render() {
    return (
      <Formik
        initialValues={{
          start: moment().subtract('days',7).startOf(`week`).subtract('day').format(`YYYY-MM-DD`),
          end: moment().subtract('days',7).endOf(`week`).format(`YYYY-MM-DD`),
          timeLength: 0,
          timeLengthType: 0,
          fileLocation: ``
        }}
        onSubmit={values => {
          const { exportToExcel, toggleModal } = this.props;
          const {  start, end, fileLocation } = values;
          return exportToExcel(this.startOfDay(start), this.endOfDay(end), fileLocation)
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
    exportToExcel: (start, end, fileLocation ) => {
      return dispatch(exportActions.exportToExcel(start, end, fileLocation));
    }
  };
};

export default connect(null,mapDispatchToProps)(ExportContainer);
