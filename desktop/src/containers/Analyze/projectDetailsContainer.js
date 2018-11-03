import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import { Typography } from '@material-ui/core';
import moment from 'moment';

import { projectSelectors } from 'store/selectors';
import { projectActions,analyzeActions } from 'store/actions';
import * as analyzeConstants from 'constants/analyze';
import Hero from 'components/layouts/Hero';
import Project from 'components/forms/Project';
import { projectValidation } from 'constants/formValidation';

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
          <Typography variant="h6">Select a Project.. </Typography>
        </Hero>
      );
    }
    
    if(status === analyzeConstants.ADDING){
      return (
        <Formik
          enableReinitialize
          initialValues={{
            name: '',
            isActive: true,
            date: moment().startOf('day').format('YYYY-MM-DD')
          }}
          validationSchema={projectValidation}
          onSubmit={(values,formikFunctions) => {
            const { createProject } = this.props;
            console.log(values);
            createProject({
              name: values.name,
              isActive: values.isActive ? 1 : 0,
              date: moment(values.date).format('MM-DD-YY HH:mm:ss')
            }).then(
              () => {
                formikFunctions.resetForm();
                formikFunctions.setStatus({ success: true });
                console.log('wow project created');
              },
              e => {
                console.log('asdf project create error', e);
                formikFunctions.setStatus({ success: false });
                formikFunctions.setSubmitting(false);
                formikFunctions.setErrors({ submit: e });
              }
            );
          }}
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
          enableReinitialize
          initialValues={{
            ...selected,
            isActive: selected.isActive ? true : false,
            date: moment(selected.date).startOf('day').format('YYYY-MM-DD')
          }} 
          validationSchema={projectValidation}
          onSubmit={(values,formikFunctions) => {
            const { updateProject } = this.props;
            console.log(values);
            updateProject({
              id: values.id,
              name: values.name,
              isActive: values.isActive ? 1 : 0,
              date: moment(values.date).format('MM-DD-YY HH:mm:ss')
            }).then(
              () => {
                formikFunctions.resetForm();
                formikFunctions.setStatus({ success: true });
                console.log('wow project updated');
              },
              e => {
                console.log('asdf project update error', e);
                formikFunctions.setStatus({ success: false });
                formikFunctions.setSubmitting(false);
                formikFunctions.setErrors({ submit: e });
              }
            );
          }}
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