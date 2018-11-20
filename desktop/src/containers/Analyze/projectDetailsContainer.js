import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import { Typography } from '@material-ui/core';
import moment from 'moment';

import { subcategorySelectors,categorySelectors,taskSelectors, projectTaskSelectors } from 'store/selectors';
import { projectActions } from 'store/actions';
import { analyzeStatus } from 'constants/analyze';
import Hero from 'components/layouts/Hero';
import Project from 'components/forms/Project';
import { projectValidation } from 'constants/formValidation';

class ProjectContainer extends Component {

  removeProject = () => {
    const { selected,removeProject } = this.props;
    removeProject(selected.id);
  }
  render () {
    const { selected,status,categories,subcategories,tasks } = this.props;
  
    if(status === analyzeStatus.INIT){
      return (
        <Hero fullWidth fullHeight>
          <Typography variant="h6">Select a Project.. </Typography>
        </Hero>
      );
    }
    
    if(status === analyzeStatus.ADDING){
      return (
        <Formik
          enableReinitialize
          initialValues={{
            name: '',
            isActive: true,
            date: moment().startOf('day').format('YYYY-MM-DD'),
            projectTasks: []
          }}
          validationSchema={projectValidation}
          onSubmit={(values,formikFunctions) => {
            const { createProject } = this.props;
            console.log(values);
            createProject({
              name: values.name,
              isActive: values.isActive ? 1 : 0,
              date: moment(values.date).format('MM-DD-YY HH:mm:ss'),
              projectTasks: values.projectTasks                   
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
                categories={categories}
                subcategories={subcategories}
                tasks={tasks}
                {...formikProps}              
              />
            );
          }} 
        /> 
      );
    }
    if(status === analyzeStatus.EDITING){
      return (
        <Formik
          enableReinitialize
          initialValues={{
            ...selected,
            isActive: selected.isActive ? true : false,
            date: moment(selected.date).startOf('day').format('YYYY-MM-DD'),
            projectTasks: selected.projectTasks.map(projectTask => {
              return {
                ...projectTask,
                subcategoryId: projectTask.task.subcategoryId,
                categoryId: projectTask.task.category.id
              };
            })
          }} 
          validationSchema={projectValidation}
          onSubmit={(values,formikFunctions) => {
            const { updateProject } = this.props;
            console.log(values);
            updateProject({
              id: values.id,
              name: values.name,
              isActive: values.isActive ? 1 : 0,
              date: moment(values.date).format('MM-DD-YY HH:mm:ss'),
              projectTasks: values.projectTasks
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
                categories={categories}
                subcategories={subcategories}
                tasks={tasks}
                removeProject={this.removeProject}
                {...formikProps}
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
    selected: projectTaskSelectors.getSelectedProject(state),
    status: state.analyze.projectStatus,
    categories: categorySelectors.getAllCategories(state),
    subcategories: subcategorySelectors.getAllSubcategories(state),
    tasks: taskSelectors.getAllTasksWithContent(state)   
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProject: project => {
      return dispatch(projectActions.createProject(project));
    },
    updateProject: project => {
      return dispatch(projectActions.updateProject(project));
    },
    removeProject: id => {
      return dispatch(projectActions.removeProject(id));
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ProjectContainer);