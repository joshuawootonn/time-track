import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import { Typography } from '@material-ui/core';
import { authorityActions } from 'store/actions';
import { authoritySelectors } from 'store/selectors';

import Authority from 'components/forms/Authority';


class AuthorityDetailContainer extends Component {
  render() {
    return (
      <Formik

        render={formikFuncitons => {
          return (
            <Authority
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