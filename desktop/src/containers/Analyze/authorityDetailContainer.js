import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import { Typography } from '@material-ui/core';

import { authorityActions } from 'store/actions';
import { authoritySelectors } from 'store/selectors';
import { authorityValidation } from 'constants/formValidation';
import { analyzeStatus } from 'constants/analyze';
import Authority from 'components/forms/Authority';
import Hero from 'components/layouts/Hero';

export class AuthorityDetail extends Component {
  render() {
    const { selected, status } = this.props;
    if (status === analyzeStatus.INIT) {
      return (
        <Hero fullWidth fullHeight>
          <Typography variant="h6">Select a Authority.. </Typography>
        </Hero>
      );
    }
    if (status === analyzeStatus.EDITING) {
      return (
        <Formik
          enableReinitialize
          initialValues={{
            ...selected
          }}
          validationSchema={authorityValidation}
          onSubmit={(values, formikFunctions) => {
            const { updateAuthority } = this.props;
            return updateAuthority({
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
            return <Authority label="Edit" {...formikFuncitons} />;
          }}
        />
      );
    }
  }
}

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    selected: authoritySelectors.getSelectedAuthority(state),
    status: state.analyze.authorityStatus
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    updateAuthority: values => {
      return dispatch(authorityActions.updateAuthority(values));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorityDetail);
