import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import { Typography } from '@material-ui/core';
import moment from 'moment';

import Hero from 'components/layouts/Hero';
import Project from 'components/forms/Project';

import {
  subcategorySelectors,
  categorySelectors,
  taskSelectors,
  projectTaskSelectors
} from 'store/selectors';
import { projectActions } from 'store/actions';

import { analyzeStatus } from 'constants/analyze';
import { projectValidation } from 'constants/formValidation';

export class ProjectCRUD extends Component {
  removeProject = () => {
    const { selected, removeProject } = this.props;
    removeProject(selected.id);
  };
  render() {
    const { selected, status, categories, subcategories, tasks } = this.props;
    if (status === analyzeStatus.INIT) {
      return (
        <Hero fullWidth fullHeight>
          <Typography variant="h6">Select a Project.. </Typography>
        </Hero>
      );
    }

    if (status === analyzeStatus.ADDING) {
      return (
        <Formik
          enableReinitialize
          initialValues={{
            name: ``,
            isActive: true,
            date: moment()
              .startOf(`day`)
              .format(`YYYY-MM-DD`),
            projectTasks: []
          }}
          validationSchema={projectValidation}
          onSubmit={(values, formikFunctions) => {
            const { createProject } = this.props;
            return createProject({
              name: values.name,
              isActive: values.isActive ? 1 : 0,
              date: moment(values.date).format(`MM-DD-YY HH:mm:ss`),
              projectTasks: values.projectTasks
            }).then(
              () => {
                formikFunctions.resetForm();
                formikFunctions.setStatus({ success: true });
              },
              e => {
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

    if (status === analyzeStatus.EDITING) {
      return (
        <Formik
          enableReinitialize
          initialValues={{
            ...selected,
            isActive: selected.isActive ? true : false,
            date: moment
              .utc(selected.date)
              .local()
              .startOf(`day`)
              .format(`YYYY-MM-DD`),
            projectTasks: selected.projectTasks.map(projectTask => {
              return {
                ...projectTask,
                subcategoryId: projectTask.task.subcategoryId,
                categoryId: projectTask.task.category.id
              };
            })
          }}
          validationSchema={projectValidation}
          onSubmit={(values, formikFunctions) => {
            const { updateProject } = this.props;

            return updateProject({
              id: values.id,
              name: values.name,
              isActive: values.isActive ? 1 : 0,
              date: moment(values.date).format(`MM-DD-YY HH:mm:ss`),
              projectTasks: values.projectTasks
            }).then(
              () => {
                formikFunctions.resetForm();
                formikFunctions.setStatus({ success: true });
              },
              e => {
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

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    selected: projectTaskSelectors.getSelectedProject(state),
    status: state.analyze.projectStatus,
    categories: categorySelectors.getAllCategories(state),
    subcategories: subcategorySelectors.getAllSubcategories(state),
    tasks: taskSelectors.getAllTasksWithContent(state)
  };
};

/* istanbul ignore next */
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectCRUD);
