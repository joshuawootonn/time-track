import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Formik } from 'formik';

import { account as accountValidation } from 'constants/formValidation';
import { employee as employeeActions } from 'store/actions';
import { shift as shiftActions } from 'store/actions';
import {employee as employeeSelectors, shift as shiftSelectors} from 'store/selectors';
import AccountSigin from 'components/forms/AccountSigin';

class ClockOutContainer extends Component {
  componentDidMount = () => {
    console.log(this.props)
    this.props.getCurrentShift(1);
  }
  render () {
    console.log(this.props);
    return (
      <div>
        NIce
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentShift: shiftSelectors.getCurrentShift(state),
    currentEmployee: employeeSelectors.getCurrentEmployee(state)
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    getCurrentShift: (employeeId) => {
      dispatch(shiftActions.getCurrentShift(employeeId))
    }
  }
}

export default withRouter(
  connect(mapStateToProps,mapDispatchToProps)(ClockOutContainer)
)


