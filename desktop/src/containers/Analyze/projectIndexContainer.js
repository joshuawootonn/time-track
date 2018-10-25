import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { projectActions, analyzeActions } from 'store/actions';
import { projectSelectors } from 'store/selectors';
import SortSelectTable from 'components/tables/SortSelect';
import Progress from 'components/helpers/Progress';
import * as TableDataTypes from 'constants/tableDataTypes';
import * as analyzeStatus from 'constants/analyze';

class ProjectIndexContainer extends Component {
  componentDidMount = () => {
    this.props.getProjects();
  }
  render () {
    const { projects,selectProject,setProjectStatus,selected } = this.props;
    const isLoading = !projects;
    //console.log(projects);
    if (isLoading) {
      return <Progress variant="circular" fullWidth fullHeight />;
    }  
    console.log(selected); 
    return (
      <SortSelectTable 
        selectLabel={selected => {return `${selected.name} selected`;}}
        label="Projects"
        tableData={projects}
        headerData={rows}
        selected={selected}
        select={selectProject}
        add={()=> setProjectStatus(analyzeStatus.ADDING)}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: projectSelectors.getAllProjects(state),
    selected: projectSelectors.getSelectedProject(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getProjects: () => {
      return dispatch(projectActions.getProjects());
    },
    selectProject: project => {
      return dispatch(analyzeActions.selectProject(project));
    },
    setProjectStatus: status => {
      return dispatch(analyzeActions.setProjectStatus(status));
    }
  };
};
ProjectIndexContainer.propTypes ={ 
  projects: PropTypes.array,
  getProjects: PropTypes.func.isRequired,
  selectProject: PropTypes.func.isRequired,
  setProjectStatus: PropTypes.func.isRequired,
  selected: PropTypes.object
};

export default connect(mapStateToProps,mapDispatchToProps)(ProjectIndexContainer);

const rows = [
  {
    id: 'name',
    numeric: false,
    padding: 'dense',
    label: 'Name',
    type: TableDataTypes.STRING
  }, 
  {
    id: 'date',
    numeric: false,
    padding: 'dense',
    label: 'Date',
    type: TableDataTypes.DATE
  }, 
  {
    id: 'isActive',
    numeric: false,
    padding: 'dense',
    label: 'Active',
    type: TableDataTypes.STRING
  }   
];
