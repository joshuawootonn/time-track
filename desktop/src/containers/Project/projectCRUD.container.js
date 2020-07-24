import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import Hero from 'components/layouts/Hero';
import {
  subcategorySelectors,
  categorySelectors,
  taskSelectors,
  projectTaskSelectors
} from 'store/selectors';
import { analyzeStatus } from 'constants/analyze';
import ProjectEditContainer from 'containers/Project/projectEdit.container';
import ProjectAddContainer from 'containers/Project/projectAdd.container';

export class ProjectCRUD extends Component {
  render() {
    const {
      selected,
      status,
      categories,
      subcategories,
      tasks,
      goToTab
    } = this.props;

    if (status === analyzeStatus.INIT) {
      return (
        <Hero fullWidth fullHeight>
          <Typography variant="h6">Select a Project.. </Typography>
        </Hero>
      );
    }

    if (status === analyzeStatus.ADDING) {
      return (
        <ProjectAddContainer
          tasks={tasks}
          categories={categories}
          subcategories={subcategories}
        />
      );
    }

    if (status === analyzeStatus.EDITING) {
      return (
        <ProjectEditContainer
          selected={selected}
          tasks={tasks}
          categories={categories}
          subcategories={subcategories}
          goToTab={goToTab}
        />
      );
    }
  }
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  selected: projectTaskSelectors.getSelectedProject(state),
  status: state.analyze.projectStatus,
  categories: categorySelectors.getAllCategories(state),
  subcategories: subcategorySelectors.getAllSubcategories(state),
  tasks: taskSelectors.getAllTasksWithContent(state)
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCRUD);
