import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import { Typography } from '@material-ui/core';

import { projectSelectors } from 'store/selectors';
import { projectActions,analyzeActions } from 'store/actions';
import * as analyzeConstants from 'constants/analyze';
import Hero from 'components/layouts/Hero';
import Project from 'components/forms/Project';


class ProjectContainer extends Component {

  deleteProject = () => {
    const { selected,deleteProject } = this.props;
    deleteProject(selected);
  }
  render () {
    const { selected,status } = this.props;
  
    if(status === analyzeConstants.INIT){
      return (
        <Hero fullWidth fullHeight>
          <Typography variant="h6">Select an Project.. </Typography>
        </Hero>
      );
    }
    if(status === analyzeConstants.ADDING){
      return (
        <Formik
          render={formikProps => {
            return (
              <Project 
                label="Add"
                type="add"
                {...formikProps}              
              />
            );
          }} 
        /> 
      );
    }
    if(status === analyzeConstants.EDITING){
      return (
        <Formik
          render={formikProps => {
            return (
              <Project
                label="Edit"
                type="edit"
                deleteProject={this.deleteProject}
                {...formikProps}
              />
            );
          }} 
        /> 
      );
    }

    return (
      <div>
        project
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    selected: projectSelectors.getSelectedProject(state),
    status: state.analyze.projectStatus    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProject: project => {
      return dispatch(projectActions.postProject(project));
    },
    updateProject: project => {
      return dispatch(projectActions.putProject(project));
    },
    deleteProject: project => {
      return dispatch(projectActions.deleteProject(project));
    },
    selectProject: project => {
      return dispatch(analyzeActions.selectProject(project));
    },
    setProjectStatus: status => {
      return dispatch(analyzeActions.setProjectStatus(status));
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ProjectContainer);