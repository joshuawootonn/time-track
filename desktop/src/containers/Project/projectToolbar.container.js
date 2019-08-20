import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AnalyzeToolbar from 'components/tables/Toolbar';

import { analyzeActions } from 'store/actions';
import { projectTaskSelectors } from 'store/selectors';

import { analyzeStatus } from 'constants/analyze';
import domain from 'constants/domains';

export class ProjectToolbar extends Component {
  selectLabel = selected => `${selected.name} selected`;

  add = () => {
    const { selected, select, setStatus } = this.props;

    if (selected && selected.id) {
      select(domain.PROJECT, selected.id);
    }
    setStatus(domain.PROJECT, analyzeStatus.ADDING);
  };

  render() {
    const { selected, toggleProjectFilter, projectFilterVisible } = this.props;

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

ProjectToolbar.propTypes = {
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
    selected: projectTaskSelectors.getSelectedProject(state)
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ ...analyzeActions }, dispatch),
    toggleProjectFilter: () =>
      dispatch(analyzeActions.toggleFilter(domain.PROJECT))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectToolbar);
