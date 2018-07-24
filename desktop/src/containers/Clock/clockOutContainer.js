import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Formik } from 'formik';

import { account as accountValidation } from 'constants/formValidation';
import { employee as employeeActions } from 'store/actions';
import AccountSigin from 'components/forms/AccountSigin';

class ClockOutContainer extends Component {
  render () {
    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    prop: state.prop
  }
}

export default withRouter(
  connect()
)


ClockOutContainer