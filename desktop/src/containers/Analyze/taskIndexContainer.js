import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { taskActions, analyzeActions } from 'store/actions';
import { employeeSelectors,taskSelectors } from 'store/selectors';
import SortSelectTable from 'components/tables/SortSelect';
import Progress from 'components/helpers/Progress';
import * as TableDataTypes from 'constants/tableDataTypes';
import * as analyzeStatus from 'constants/analyze';

class TaskIndexContainer extends Component {
  
  componentDidMount = () => {
    this.props.getTasks();
  };

  render() {
    const { tasks, selected, selectEmployee,setEmployeeStatus } = this.props;

    const isLoading = !tasks;
    if (isLoading) {
      return <Progress variant="circular" fullPage />;
    }
    console.log(tasks);
   
    return (
      <SortSelectTable
        tableData={tasks}
        headerData={rows}
        selected={{}}
        select={()=>{console.log('select task');}}
        add={() => {console.log('add task');}}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: taskSelectors.getAllTasksWithContent(state)
    // employees: employeeSelectors.getAllEmployeesWithContents(state),
    // selected: employeeSelectors.getSelectedEmployee(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTasks: () => {
      return dispatch(taskActions.getTasks());
    }
    // selectEmployee: employee => {
    //   return dispatch(analyzeActions.selectEmployee(employee));
    // },
    // setEmployeeStatus: status => {
    //   return dispatch(analyzeActions.setEmployeeStatus(status));
    // }
  };
};

TaskIndexContainer.propTypes = {
  employees: PropTypes.array.isRequired,
  getTasks: PropTypes.func.isRequired,
  selected: PropTypes.object,
  selectEmployee: PropTypes.func.isRequired,
  setEmployeeStatus: PropTypes.func.isRequired
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
