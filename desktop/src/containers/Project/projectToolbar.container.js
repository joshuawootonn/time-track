import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { analyzeActions } from 'store/actions';
import { projectSelectors, projectTaskSelectors } from 'store/selectors';
import Progress from 'components/helpers/Progress';
import { analyzeStatus } from 'constants/analyze';
import domain from 'constants/domains';

import AnalyzeToolbar from 'components/tables/toolbars/NewAnalyzeToolbar';

export class ProjectIndex extends Component {
  selectLabel = selected =>`${selected.name} selected`;

  select = object => this.props.select(domain.PROJECT,object)

  add = () => {
    const { selected, select, setStatus } = this.props;
    if(selected && selected.id){
      select(domain.PROJECT,selected.id);
    }
    setStatus(domain.PROJECT,analyzeStatus.ADDING);
  }

  render () {
    const { projects, selected, toggleProjectFilter,projectFilterVisible } = this.props;

    if (!projects) return <Progress variant="circular" fullWidth fullHeight />;

    return (
      <AnalyzeToolbar 
        selectLabel={this.selectLabel}
        label="Projects"
        add={this.add}
        selected={selected}
        toggleFilter={toggleProjectFilter}
        isFilterVisible={projectFilterVisible}
      />
    );
  }
}

ProjectIndex.propTypes ={ 
  projects: PropTypes.array,
  select: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  selected: PropTypes.object,
  toggleProjectFilter: PropTypes.func,
  projectFilterVisible: PropTypes.bool
};

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    projectFilterVisible: state.analyze.projectFilterVisible,
    projects: projectSelectors.getAllProjects(state),
    selected: projectTaskSelectors.getSelectedProject(state)
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ ...analyzeActions }, dispatch),
    toggleProjectFilter: () => dispatch(analyzeActions.toggleFilter(domain.PROJECT)) 
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ProjectIndex);

