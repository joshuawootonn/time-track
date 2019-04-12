import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { analyzeActions } from 'store/actions';
import { projectSelectors, projectTaskSelectors } from 'store/selectors';
import VirtualizedSortSelect from 'components/tables/VirtualizedSortSelect';
import Progress from 'components/helpers/Progress';
import * as TableDataTypes from 'constants/tableDataTypes';
import { analyzeStatus } from 'constants/analyze';
import domain from 'constants/domains';

export class ProjectIndex extends Component {
  selectLabel = selected =>`${selected.name} selected`;

  select = object => this.props.select(domain.PROJECT,object)

  add = () => this.props.setStatus(domain.PROJECT,analyzeStatus.ADDING)

  render () {
    const { projects,selected } = this.props;

    console.log(`project analyze render`);
    if (!projects) return <Progress variant="circular" fullWidth fullHeight />;

    return (
      <VirtualizedSortSelect 
        data={projects || []}
        columns={rows}
        selected={selected}
        select={this.select}       
        initialSortBy='date'
      />
    );
  }
}

ProjectIndex.propTypes ={ 
  projects: PropTypes.array,
  select: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  selected: PropTypes.object
};

/* istanbul ignore next */
const mapStateToProps = state => {
  const filters = state.analyze.projectFilters;
  return {
    projects: projectSelectors.getAllProjectsNew(state, { filters, sorts: {} }),
    selected: projectTaskSelectors.getSelectedProject(state)
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ ...analyzeActions }, dispatch)   
  };
};


export default connect(mapStateToProps,mapDispatchToProps)(ProjectIndex);

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
    id: `date`,    
    dataKey: `date`, 
    width: 80, 
    height: 56,
    padding: `dense`,
    label: `Date`,
    type: TableDataTypes.DATE
  }, 
  {
    id: `isActive`, 
    dataKey: `isActive`,  
    width: 80, 
    height: 56, 
    align: `right`, 
    padding: `dense`,
    label: `Active`,
    type: TableDataTypes.BOOLEAN
  }   
];
