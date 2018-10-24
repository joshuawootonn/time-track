import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Formik } from 'formik';
import { Typography } from '@material-ui/core';

import { taskSelectors,categorySelectors,subcategorySelectors,dimensionSelectors } from 'store/selectors';
import * as analyzeConstants from 'constants/analyze';
import { analyzeActions, taskActions } from 'store/actions';
import Hero from 'components/layouts/Hero';
import Task from 'components/forms/Task';

class TaskDetailsContainer extends Component {
  deleteTask = () => {
    const { selected,deleteTask } = this.props;
    deleteTask(selected);
  }
  render() {
    const { status,categories,subcategories,dimensions,selected } = this.props;
    if(status === analyzeConstants.INIT){
      return (
        <Hero fullWidth fullHeight>
          <Typography variant="h6">Select an Task.. </Typography>
        </Hero>
      );
    }
    //console.log('container: ',this.props);
    if(status === analyzeConstants.ADDING){
      return (
        <Formik 
          enableReinitialize
          initialValues={{
            name: '',
            categoryId: -1,
            subcategoryId: -1,
            dimensionId: -1,
            isActive: true
          }}
          onSubmit={(values,formikFunctions) => {
            const { createTask } = this.props;
            console.log(values);
            createTask({
              name: values.name,
              dimensionId: values.dimensionId,
              subcategoryId: values.subcategoryId,
              isActive: values.isActive ? 1 : 0
            }).then(
              () => {
                formikFunctions.resetForm();
                formikFunctions.setStatus({ success: true });
                console.log('wow task created');
              },
              e => {
                console.log('asdf task create error', e);
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
                dimensions={dimensions}
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
            isActive: selected.isActive ? true : false
          }}
          onSubmit={(values,formikFunctions) => {
            const { updateTask } = this.props;            
            updateTask({
              id: values.id,
              name: values.name,
              dimensionId: values.dimensionId,
              subcategoryId: values.subcategoryId,
              isActive: values.isActive ? 1 : 0
            }).then(
              () => {
                formikFunctions.resetForm();
                formikFunctions.setStatus({ success: true });
                console.log('wow task updated');
              },
              e => {
                console.log('asdf task update error', e);
                formikFunctions.setStatus({ success: false });
                formikFunctions.setSubmitting(false);
                formikFunctions.setErrors({ submit: e });
              }
            );
          }}
          render={formikProps => {
            return (
              <Task 
                deleteTask={this.deleteTask}
                categories={categories}
                subcategories={subcategories}
                dimensions={dimensions}
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

const mapStateToProps = state => {
  return {
    selected: taskSelectors.getSelectedTask(state),
    status: state.analyze.taskStatus,
    categories: categorySelectors.getAllCategories(state),
    subcategories: subcategorySelectors.getAllSubcategories(state),
    dimensions: dimensionSelectors.getAllDimensions(state)
  };
};


const mapDispatchToProps = dispatch => {
  return {
    createTask: task => {
      return dispatch(taskActions.postTask(task));
    },
    updateTask: task => {
      return dispatch(taskActions.putTask(task));
    },
    deleteTask: task => {
      return dispatch(taskActions.deleteTask(task));
    },
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
};

export default connect(mapStateToProps,mapDispatchToProps)(TaskDetailsContainer);