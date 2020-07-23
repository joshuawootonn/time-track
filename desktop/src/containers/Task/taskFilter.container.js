import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import { Card } from '@material-ui/core';

import Task from 'components/forms/Task';

import { categorySelectors, subcategorySelectors } from 'store/selectors';
import { analyzeActions } from 'store/actions';

import domain from 'constants/domains';

export class TaskFilter extends Component {
  render() {
    const {
      categories,
      subcategories,
      clearFilter,
      taskFilters,
      taskFilterVisible,
      updateFilter,
      toggleFilter
    } = this.props;

    if (taskFilterVisible) {
      return (
        <Formik
          enableReinitialize
          initialValues={{
            ...taskFilters
          }}
          onSubmit={(values, formikFunctions) => {
            updateFilter({ ...values });
            toggleFilter();
            formikFunctions.resetForm();
          }}
          render={formikProps => {
            return (
              <Card
                style={{
                  position: `absolute`,
                  top: `70px`,
                  left: `2.5%`,
                  zIndex: 900,
                  width: `95%`,
                  minHeight: `100px`
                }}
              >
                <Task
                  removeTask={this.removeTask}
                  categories={[{ id: -1, type: `All` }, ...categories]}
                  subcategories={[
                    { id: -1, type: `All`, categoryId: -1 },
                    ...subcategories
                  ]}
                  label="Filter"
                  type="filter"
                  clearFilter={clearFilter}
                  {...formikProps}
                />
              </Card>
            );
          }}
        />
      );
    }
    return null;
  }
}

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    taskFilters: state.analyze.taskFilters,
    taskFilterVisible: state.analyze.taskFilterVisible,
    categories: categorySelectors.getAllCategories(state),
    subcategories: subcategorySelectors.getAllSubcategories(state)
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    updateFilter: filters =>
      dispatch(analyzeActions.updateFilter(domain.TASK, filters)),
    clearFilter: () => dispatch(analyzeActions.clearFilter(domain.TASK)),
    toggleFilter: () => dispatch(analyzeActions.toggleFilter(domain.TASK))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskFilter);
