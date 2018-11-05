import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import { Typography } from '@material-ui/core';
import { authorityActions } from 'store/actions';
import { authoritySelectors } from 'store/selectors';
import { authorityValidation } from 'constants/formValidation';

import Authority from 'components/forms/Authority';


class AuthorityDetailContainer extends Component {
  render() {
    const {selected} = this.props;
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