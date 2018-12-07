import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import { Typography } from '@material-ui/core';
import { crewActions } from 'store/actions';
import { crewSelectors } from 'store/selectors';
import { crewValidation } from 'constants/formValidation';
import { analyzeStatus } from 'constants/analyze';
import Crew from 'components/forms/Crew';

import Hero from 'components/layouts/Hero';

export class CrewDetail extends Component {
  render() {
    const { selected,status } = this.props;
    if(status === analyzeStatus.INIT) {
      return (
        <Hero fullWidth fullHeight>
          <Typography  variant="h6">Select a Crew.. </Typography>
        </Hero>
      );
    }
    if(status === analyzeStatus.EDITING){
      return (
        <Formik
          enableReinitialize
          initialValues={{
            ...selected
          }}   
          validationSchema={crewValidation}
          onSubmit={(values,formikFunctions) => {
            const { updateCrew } = this.props;
            updateCrew({
              ...values
            }).then(
              () => {
                formikFunctions.resetForm();
                formikFunctions.setStatus({ success: true });
              },
              e => {
                formikFunctions.setStatus({ success: false });
                formikFunctions.setSubmitting(false);
                //formikFunctions.setErrors({ submit: e });
                console.log('asdf', e);
              }
            );
          }}
          render={formikFuncitons => {
            return (
              <Crew
                label="Edit"
                {...formikFuncitons}
              />
            );
          }}
        />
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    selected: crewSelectors.getSelectedCrew(state),
    status: state.analyze.crewStatus
  };
};

export default connect(mapStateToProps, { ...crewActions })(CrewDetail);