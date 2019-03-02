import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { analyzeActions, projectActions } from 'store/actions';
import { projectSelectors, projectTaskSelectors } from 'store/selectors';
import SortSelectTable from 'components/tables/SortSelect';
import Progress from 'components/helpers/Progress';
import * as TableDataTypes from 'constants/tableDataTypes';
import { analyzeStatus } from 'constants/analyze';
import domain from 'constants/domains';

export class ProjectIndex extends Component {
  componentDidMount = () => {
    this.props.getAllProjects();
  }

  selectLabel = selected =>`${selected.name} selected`;

  select = object => this.props.select(domain.PROJECT,object)

  add = () => this.props.setStatus(domain.PROJECT,analyzeStatus.ADDING)

  render () {
    const { projects,selected } = this.props;

    console.log('project analyze render');
    if (projects === undefined) return <Progress variant="circular" fullWidth fullHeight />;

    return (
      <SortSelectTable 
        selectLabel={this.selectLabel}
        label="Projects"
        tableData={projects || []}
        headerData={rows}
        selected={selected}
        select={this.select}
        add={this.add}
        initialOrderBy='name'
      />
    );
  }
}

ProjectIndex.propTypes ={ 
  projects: PropTypes.array,
  getAllProjects: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  selected: PropTypes.object
};

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    projects: projectSelectors.getAllProjects(state),
    selected: projectTaskSelectors.getSelectedProject(state)
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    getAllProjects: () => {
      return dispatch(projectActions.getAllProjects());
    },
    ...bindActionCreators({ ...analyzeActions }, dispatch)   
  };
};


export default connect(mapStateToProps,mapDispatchToProps)(ProjectIndex);

const rows = [
  {
    id: 'name',    
    padding: 'dense',
    label: 'Name',
    type: TableDataTypes.STRING
  }, 
  {
    id: 'date',    
    padding: 'dense',
    label: 'Date',
    type: TableDataTypes.DATE
  }, 
  {
    id: 'isActive',   
    align: 'right', 
    padding: 'dense',
    label: 'Active',
    type: TableDataTypes.BOOLEAN
  }   
];
