import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import { taskActions, analyzeActions } from 'store/actions';
import { taskSelectors } from 'store/selectors';
import SortSelectTable from 'components/tables/SortSelect';
import Progress from 'components/helpers/Progress';
import * as TableDataTypes from 'constants/tableDataTypes';
import { analyzeStatus } from 'constants/analyze';
import domain from 'constants/domains';

class TaskIndexContainer extends Component {
  
  componentDidMount = () => {
    this.props.getTasks();
  };

  render() {
    const { tasks, selected, select,setStatus } = this.props;
    
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
        select={object =>select(domain.TASK,object)}
        add={() => {setStatus(domain.TASK,analyzeStatus.ADDING);}}
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
    ...bindActionCreators({ ...analyzeActions }, dispatch)   
  };
};

TaskIndexContainer.propTypes = {
  tasks: PropTypes.array,
  getTasks: PropTypes.func.isRequired,
  selected: PropTypes.object,
  select: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired
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
    keys: ['type']
  },
  {
    id: 'subcategory',
    numeric: false,
    padding: 'dense',
    label: 'Subcategory',
    type: TableDataTypes.OBJECT,
    keys: ['type']
  },
 
  {
    id: 'dimension',
    numeric: false,
    padding: 'dense',
    label: 'Dimension',
    type: TableDataTypes.OBJECT,
    keys: ['type']
  }, 
  {
    id: 'isActive',
    numeric: false,
    padding: 'dense',
    label: 'Active',
    type: TableDataTypes.STRING
  }
];
