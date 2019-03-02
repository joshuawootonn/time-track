import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { analyzeActions,taskActions } from 'store/actions';
import { taskSelectors } from 'store/selectors';
import SortSelectTable from 'components/tables/SortSelect';
import Progress from 'components/helpers/Progress';
import * as TableDataTypes from 'constants/tableDataTypes';
import { analyzeStatus } from 'constants/analyze';
import domain from 'constants/domains';

export class TaskIndex extends Component {  
  componentDidMount = () => {
    this.props.getAllTasks();
  };

  selectLabel = selected =>`${selected.name} selected`;

  select = object => this.props.select(domain.TASK,object)

  add = () => this.props.setStatus(domain.TASK,analyzeStatus.ADDING)

  render() {
    const { tasks, selected } = this.props;
    console.log('task analyze render');
    if (!tasks) return <Progress variant="circular" fullWidth fullHeight />;
    
    return (
      <SortSelectTable
        selectLabel={this.selectLabel}
        label="Tasks"
        tableData={tasks || []}
        headerData={rows}
        selected={selected}
        select={this.select}
        add={this.add}
        initialOrderBy='name'
      />
    );
  }
}

TaskIndex.propTypes = {
  tasks: PropTypes.array,
  getAllTasks: PropTypes.func.isRequired,
  selected: PropTypes.object,
  select: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired
};

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    tasks: taskSelectors.getAllTasksWithContent(state),
    selected: taskSelectors.getSelectedTask(state)
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    getAllTasks: () => {
      return dispatch(taskActions.getAllTasks());
    },
    ...bindActionCreators({ ...analyzeActions }, dispatch)   
  };
};

export default connect( mapStateToProps, mapDispatchToProps)(TaskIndex);

const rows = [
  {
    id: 'name',    
    padding: 'dense',
    label: 'Name',
    type: TableDataTypes.STRING
  }, 
  {
    id: 'category',    
    padding: 'dense',
    label: 'Category',
    type: TableDataTypes.OBJECT,
    keys: ['type']
  },
  {
    id: 'subcategory',    
    padding: 'dense',
    label: 'Subcategory',
    type: TableDataTypes.OBJECT,
    keys: ['type']
  },
 
  {
    id: 'dimension',    
    padding: 'dense',
    label: 'Dimension',
    type: TableDataTypes.OBJECT,
    keys: ['type']
  }, 
  {
    id: 'isActive',   
    align: 'right', 
    padding: 'dense',
    label: 'Active',
    type: TableDataTypes.BOOLEAN
  }
];
