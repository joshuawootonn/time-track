import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { projectActions, analyzeActions } from 'store/actions';
import { projectSelectors, projectTaskSelectors } from 'store/selectors';
import SortSelectTable from 'components/tables/SortSelect';
import Progress from 'components/helpers/Progress';
import * as TableDataTypes from 'constants/tableDataTypes';
import { analyzeStatus } from 'constants/analyze';
import domain from 'constants/domains';

class ProjectIndexContainer extends Component {
  componentDidMount = () => {
    this.props.getProjects();
  }
  render () {
    const { projects,select,setStatus,selected } = this.props;
    const isLoading = !projects;
    if (isLoading) {
      return <Progress variant="circular" fullWidth fullHeight />;
    }  
    return (
      <SortSelectTable 
        selectLabel={selected => {return `${selected.name} selected`;}}
        label="Projects"
        tableData={projects}
        headerData={rows}
        selected={selected}
        select={object =>select(domain.PROJECT,object)}
        add={()=> setStatus(domain.PROJECT,analyzeStatus.ADDING)}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: projectSelectors.getAllProjects(state),
    selected: projectTaskSelectors.getSelectedProject(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getProjects: () => {
      return dispatch(projectActions.getProjects());
    },    
    ...bindActionCreators({ ...analyzeActions }, dispatch)   
  };
};
ProjectIndexContainer.propTypes ={ 
  projects: PropTypes.array,
  getProjects: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
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
