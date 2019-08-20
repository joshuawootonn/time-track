import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AnalyzeToolbar from 'components/tables/Toolbar';

import { analyzeActions } from 'store/actions';
import { taskSelectors } from 'store/selectors';

import { analyzeStatus } from 'constants/analyze';
import domain from 'constants/domains';

export class TaskToolbar extends Component {
  selectLabel = selected => `${selected.name} selected`;

  add = () => {
    const { selected, select, setStatus } = this.props;
    if (selected && selected.id) {
      select(domain.TASK, selected.id);
    }
    setStatus(domain.TASK, analyzeStatus.ADDING);
  };

  render() {
    const { selected, toggleTaskFilter, taskFilterVisible } = this.props;

    return (
      <AnalyzeToolbar
        selectLabel={this.selectLabel}
        label="Task"
        add={this.add}
        selected={selected}
        toggleFilter={toggleTaskFilter}
        isFilterVisible={taskFilterVisible}
      />
    );
  }
}

TaskToolbar.propTypes = {
  selected: PropTypes.object,
  select: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  toggleTaskFilter: PropTypes.func,
  taskFilterVisible: PropTypes.bool
};

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    taskFilterVisible: state.analyze.taskFilterVisible,
    tasks: taskSelectors.getAllTasksWithContent(state),
    selected: taskSelectors.getSelectedTask(state)
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ ...analyzeActions }, dispatch),
    toggleTaskFilter: () => dispatch(analyzeActions.toggleFilter(domain.TASK))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskToolbar);
