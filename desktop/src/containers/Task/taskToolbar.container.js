import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { analyzeActions } from 'store/actions';
import { taskSelectors } from 'store/selectors';
import SortSelectTable from 'components/tables/SortSelect';
import Progress from 'components/helpers/Progress';
import * as TableDataTypes from 'constants/tableDataTypes';
import { analyzeStatus } from 'constants/analyze';
import domain from 'constants/domains';

import AnalyzeToolbar from 'components/tables/toolbars/NewAnalyzeToolbar';

export class TaskToolbar extends Component {  
  selectLabel = selected =>`${selected.name} selected`;

  select = object => this.props.select(domain.TASK,object)
  // TODO: double check that all these methods are needed
  add = () => {
    const { selected, select, setStatus } = this.props;
    if(selected && selected.id){
      select(domain.TASK,selected.id);
    }
    setStatus(domain.TASK,analyzeStatus.ADDING)
  }
  render() {
    const { tasks, selected, toggleTaskFilter, taskFilterVisible } = this.props;
    // console.log('task analyze render');
    if (!tasks) return <Progress variant="circular" fullWidth fullHeight />;
    
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
  tasks: PropTypes.array,
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

export default connect( mapStateToProps, mapDispatchToProps)(TaskToolbar);
