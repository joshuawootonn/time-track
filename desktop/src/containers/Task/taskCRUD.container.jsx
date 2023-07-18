import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Formik } from 'formik';
import { Typography } from '@material-ui/core';

import Hero from '~/components/layouts/Hero';
import Task from '~/components/forms/Task';

import {
  taskSelectors,
  categorySelectors,
  subcategorySelectors
} from '~/store/selectors';
import { taskActions } from '~/store/actions';

import { analyzeStatus } from '~/constants/analyze';
import { taskValidation } from '~/constants/formValidation';

export class TaskCRUD extends Component {
  removeTask = () => {
    const { selected, removeTask } = this.props;
    removeTask(selected.id);
  };
  render() {
    const { status, categories, subcategories, selected } = this.props;

    if (status === analyzeStatus.INIT) {
      return (
        <Hero fullWidth fullHeight>
          <Typography variant="h6">Select a Task.. </Typography>
        </Hero>
      );
    }

    if (status === analyzeStatus.ADDING) {
      return (
        <Formik
          enableReinitialize
          initialValues={{
            name: ``,
            categoryId: -1,
            subcategoryId: -1,
            isActive: true
          }}
          validationSchema={taskValidation}
          onSubmit={(values, formikFunctions) => {
            const { createTask } = this.props;
            return createTask({
              name: values.name,
              subcategoryId: values.subcategoryId,
              isActive: values.isActive ? 1 : 0
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
              <Task
                categories={categories}
                subcategories={subcategories}
                label="Add"
                type="add"
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
            isActive: selected.isActive ? true : false
          }}
          validationSchema={taskValidation}
          onSubmit={(values, formikFunctions) => {
            const { updateTask } = this.props;
            return updateTask({
              id: values.id,
              name: values.name,
              subcategoryId: values.subcategoryId,
              isActive: values.isActive ? 1 : 0
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
              <Task
                removeTask={this.removeTask}
                categories={categories}
                subcategories={subcategories}
                label="Edit"
                type="edit"
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
    selected: taskSelectors.getSelectedTask(state),
    status: state.analyze.taskStatus,
    categories: categorySelectors.getAllCategories(state),
    subcategories: subcategorySelectors.getAllSubcategories(state)
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    createTask: task => {
      return dispatch(taskActions.createTask(task));
    },
    updateTask: task => {
      return dispatch(taskActions.updateTask(task));
    },
    removeTask: id => {
      return dispatch(taskActions.removeTask(id));
    }
  };
};

TaskCRUD.propTypes = {
  status: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskCRUD);
