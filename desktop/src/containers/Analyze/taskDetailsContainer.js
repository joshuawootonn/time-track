import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Formik } from 'formik';
import { Typography } from '@material-ui/core';

import { taskSelectors } from 'store/selectors';
import * as analyzeConstants from 'constants/analyze';
import { analyzeActions } from 'store/actions';
import Hero from 'components/layouts/Hero';

class TaskDetailsContainer extends Component {
  render() {
    const { status } = this.props;
    if(status === analyzeConstants.INIT){
      return (
        <Hero fullWidth fullHeight>
          <Typography variant="h6">Select an Task.. </Typography>
        </Hero>
      );
    }
    if(status === analyzeConstants.ADDING || status === analyzeConstants.EDITING){
      return (
        <div>sadf</div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    selected: taskSelectors.getSelectedTask(state),
    status: state.analyze.taskStatus
  };
};


const mapDispatchToProps = dispatch => {
  return {
    // createEmployee: employee => {
    //   return dispatch(employeeActions.postEmployee(employee));
    // },
    // updateEmployee: employee => {
    //   return dispatch(employeeActions.putEmployee(employee));
    // },
    // deleteEmployee: employee => {
    //   return dispatch(employeeActions.deleteEmployee(employee));
    // },
    selectTask: task => {
      return dispatch(analyzeActions.selectTask(task));
    },
    setTaskStatus: status => {
      return dispatch(analyzeActions.setTaskStatus(status));
    }
  };
};

TaskDetailsContainer.propTypes = {
  status: PropTypes.string.isRequired
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskDetailsContainer);