import React, { Component } from 'react';
import { connect } from 'react-redux';

import ClockOutContainer from 'containers/Clock/clockOutContainer';
import {shiftSelectors} from 'store/selectors';

class ShiftDetailsContainer extends Component {
  render () {
    const { selected,status } = this.props;
    console.log(selected,status)
    return (
      <div>
        asdf
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selected: shiftSelectors.getSelectedShift(state),
    
    status: state.analyze.shiftStatus    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // createProject: project => {
    //   return dispatch(projectActions.postProject(project));
    // },
    // updateProject: project => {
    //   return dispatch(projectActions.putProject(project));
    // },
    // deleteProject: project => {
    //   return dispatch(projectActions.deleteProject(project));
    // },
    // selectProject: project => {
    //   return dispatch(analyzeActions.selectProject(project));
    // },
    // setProjectStatus: status => {
    //   return dispatch(analyzeActions.setProjectStatus(status));
    // }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ShiftDetailsContainer);