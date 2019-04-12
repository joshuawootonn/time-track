import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// TODO: double check that these imports are ordered well
import { analyzeActions } from 'store/actions';
import { taskSelectors } from 'store/selectors';
import VirtualizedSortSelect from 'components/tables/VirtualizedSortSelect';
import Progress from 'components/helpers/Progress';
import * as TableDataTypes from 'constants/tableDataTypes';
import { analyzeStatus } from 'constants/analyze';
import domain from 'constants/domains';

export class TaskIndex extends Component {  
  selectLabel = selected =>`${selected.name} selected`;

  select = object => this.props.select(domain.TASK,object)

  add = () => this.props.setStatus(domain.TASK,analyzeStatus.ADDING)

  render() {
    const { tasks, selected } = this.props;

    if (!tasks) return <Progress variant="circular" fullWidth fullHeight />;
    
    return (
     
      <VirtualizedSortSelect 
        data={tasks || []}
        columns={rows}
        selected={selected}
        select={this.select}       
        initialSortBy='name'
      />
    );
  }
}

TaskIndex.propTypes = {
  tasks: PropTypes.array,
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
    ...bindActionCreators({ ...analyzeActions }, dispatch)   
  };
};

export default connect( mapStateToProps, mapDispatchToProps)(TaskIndex);

const rows = [
  {
    id: `name`, 
    dataKey: `name`, 
    width: 150, 
    height: 56,     
    padding: `dense`,
    label: `Name`,
    type: TableDataTypes.STRING
  }, 
  {
    id: `category_type`,  
    dataKey: `category`, 
    width: 150, 
    height: 56,    
    padding: `dense`,
    label: `Category`,
    type: TableDataTypes.OBJECT,
    keys: [`type`]
  },
  {
    id: `subcategory_type`,  
    dataKey: `subcategory`, 
    width: 150, 
    height: 56,    
    padding: `dense`,
    label: `Subcategory`,
    type: TableDataTypes.OBJECT,
    keys: [`type`]
  },
 
  // { // ICEBOX: add dimension functionality
  //   id: `dimension_type`,   
  //   dataKey: `dimension`, 
  //   width: 150, 
  //   height: 56,  
  //   padding: `dense`,
  //   label: `Dimension`,
  //   type: TableDataTypes.OBJECT,
  //   keys: [`type`]
  // }, 
  {
    id: `isActive`,  
    dataKey: `isActive`,  // TODO: does align right look ok?
    width: 150, 
    height: 56,   
    align: `right`, 
    padding: `dense`,
    label: `Active`,
    type: TableDataTypes.BOOLEAN
  }
];
