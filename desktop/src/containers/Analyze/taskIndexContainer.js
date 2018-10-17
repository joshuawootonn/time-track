import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { taskActions, analyzeActions } from 'store/actions';
import { taskSelectors } from 'store/selectors';
import SortSelectTable from 'components/tables/SortSelect';
import Progress from 'components/helpers/Progress';
import * as TableDataTypes from 'constants/tableDataTypes';
import * as analyzeStatus from 'constants/analyze';

class TaskIndexContainer extends Component {
  
  componentDidMount = () => {
    this.props.getTasks();
  };

  render() {
    const { tasks, selected, selectTask,setTaskStatus } = this.props;

    const isLoading = !tasks;
    if (isLoading) {
      return <Progress variant="circular" fullPage />;
    }
    console.log(tasks);
   
    return (
      <SortSelectTable
        selectLabel={selected => {return `${selected.name} selected`;}}
        label="Tasks"
        tableData={tasks}
        headerData={rows}
        selected={selected}
        select={selectTask}
        add={() => {setTaskStatus(analyzeStatus.ADDING);}}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: taskSelectors.getAllTasksWithContent(state),
    selected: taskSelectors.getSelectedTask(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTasks: () => {
      return dispatch(taskActions.getTasks());
    },
    selectTask: task => {
      return dispatch(analyzeActions.selectTask(task));
    },
    setTaskStatus: status => {
      return dispatch(analyzeActions.setTaskStatus(status));
    }
  };
};

TaskIndexContainer.propTypes = {
  tasks: PropTypes.array.isRequired,
  getTasks: PropTypes.func.isRequired,
  selected: PropTypes.object,
  selectTask: PropTypes.func.isRequired,
  setTaskStatus: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskIndexContainer);

const rows = [
  {
    id: 'name',
    numeric: false,
    padding: 'dense',
    label: 'Name',
    type: TableDataTypes.STRING
  }, 
  {
    id: 'category',
    numeric: false,
    padding: 'dense',
    label: 'Category',
    type: TableDataTypes.OBJECT,
    key: 'type'
  },
  {
    id: 'subcategory',
    numeric: false,
    padding: 'dense',
    label: 'Subcategory',
    type: TableDataTypes.OBJECT,
    key: 'type'
  },
 
  {
    id: 'dimension',
    numeric: false,
    padding: 'dense',
    label: 'Dimension',
    type: TableDataTypes.OBJECT,
    key: 'type'
  }, 
  {
    id: 'isActive',
    numeric: false,
    padding: 'dense',
    label: 'Active',
    type: TableDataTypes.STRING
  }
];
