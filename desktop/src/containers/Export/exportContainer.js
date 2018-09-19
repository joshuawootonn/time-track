import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Formik } from 'formik';
import moment from 'moment';

import Export from 'components/forms/Export';

import { exportValidation } from 'constants/formValidation';
import { exportActions } from 'store/actions';

class ExportContainer extends Component {
  cancel = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <Formik
        initialValues={{
          exportCategory: 0,
          start: moment('2018-08-26').format('YYYY-MM-DD'),
          end: moment('2018-09-01').format('YYYY-MM-DD'),
          timeLength: 0,
          timeLengthType: 0,
          fileLocation: ''
        }}
        onSubmit={values => {
          const { exportToExcel, history } = this.props;
          const { exportCategory, start, end, fileLocation } = values;
          exportToExcel(exportCategory, start, end, fileLocation)
            .then(() => history.push('/'));
        }}
        validationSchema={exportValidation}
        render={formikProps => {
          return <Export cancel={this.cancel} {...formikProps} />;
        }}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    exportToExcel: (exportCategory, start, end, fileLocation ) => {
      return dispatch(
        exportActions.exportToExcel(exportCategory, start, end, fileLocation),
      );
    }
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(ExportContainer),
);
