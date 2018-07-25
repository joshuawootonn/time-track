import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Formik } from 'formik';

import { shift as shiftValidation } from 'constants/formValidation';
import { shift as shiftActions, employee as employeeActions } from 'store/actions';
import { employee as employeeSelectors, shift as shiftSelectors } from 'store/selectors';
import ClockOut from 'components/forms/ClockOut';

class ClockOutContainer extends Component {
  componentDidMount = () => {
    this.props.getCurrentShift(this.props.currentEmployee.id);
  }

  render() {
    const { currentEmployee, currentShift } = this.props;
    const isLoading = !currentShift;


    if (isLoading) {
      return <div>Loading</div>
    }

    return (
      <Formik
        initialValues={{ length: '0' }}
        validationSchema={shiftValidation}
        onSubmit={values => {
          console.log(values);
          const { currentEmployee, currentShift, history } = this.props;
          this.props.clockOut(currentEmployee, currentShift)
            .then(() => history.push('/'))
            .catch(() => history.push('/'))



        }}
        render={formProps => <ClockOut {...formProps} />}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentShift: shiftSelectors.getCurrentShift(state),
    currentEmployee: employeeSelectors.getCurrentEmployee(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCurrentShift: (employeeId) => {
      return dispatch(shiftActions.getCurrentShift(employeeId))
    },
    clockOut: (employee, shift) => {
      return dispatch(employeeActions.clockOut(employee, shift))
    }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ClockOutContainer)
)


