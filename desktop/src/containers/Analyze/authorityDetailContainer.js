import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import { Typography } from '@material-ui/core';
import { authorityActions } from 'store/actions';
import { authoritySelectors } from 'store/selectors';
import { authorityValidation } from 'constants/formValidation';
import * as analyzeConstants from 'constants/analyze';
import Authority from 'components/forms/Authority';

import Hero from 'components/layouts/Hero';

class AuthorityDetailContainer extends Component {
  render() {
    const { selected,status } = this.props;
    if(status === analyzeConstants.INIT) {
      return (
        <Hero fullWidth fullHeight>
          <Typography  variant="h6">Select a Authority.. </Typography>
        </Hero>
      );
    }
    if(status === analyzeConstants.EDITING){
      return (
        <Formik
          enableReinitialize
          initialValues={{
            ...selected
          }}   
          validationSchema={authorityValidation}
          onSubmit={(values,formikFunctions) => {
            const { updateAuthority } = this.props;
            updateAuthority({
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
              <Authority
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
    selected: authoritySelectors.getSelectedAuthority(state),
    status: state.analyze.authorityStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateAuthority: authority => {
      return dispatch(authorityActions.putAuthority(authority));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(AuthorityDetailContainer);