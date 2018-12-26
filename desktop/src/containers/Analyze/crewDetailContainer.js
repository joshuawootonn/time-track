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
            return updateCrew({
              ...values
            }).then(
              () => {
                formikFunctions.resetForm();
                formikFunctions.setStatus({ success: true });
              },
              () => {
                formikFunctions.setStatus({ success: false });
                formikFunctions.setSubmitting(false);
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

/* istanbul ignore next */
const mapStateToProps = state => ({
  selected: crewSelectors.getSelectedCrew(state),
  status: state.analyze.crewStatus
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    updateCrew: values => {
      return dispatch(crewActions.updateCrew(values));
    }
  };  
};

export default connect(mapStateToProps, mapDispatchToProps)(CrewDetail);