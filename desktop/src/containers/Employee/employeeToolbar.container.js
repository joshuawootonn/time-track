import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AnalyzeToolbar from 'components/tables/Toolbar';

import { analyzeActions } from 'store/actions';
import { employeeSelectors } from 'store/selectors';

import { analyzeStatus } from 'constants/analyze';
import domain from 'constants/domains';

export class EmployeeToolbar extends Component {
  selectLabel = selected =>
    `${selected.firstName} ${selected.lastName} selected`;

  add = () => {
    const { selected, select, setStatus } = this.props;
    if (selected && selected.id) {
      select(domain.EMPLOYEE, selected.id);
    }
    setStatus(domain.EMPLOYEE, analyzeStatus.ADDING);
  };

  render() {
    const {
      selected,
      toggleEmployeeFilter,
      employeeFilterVisible
    } = this.props;

    return (
      <AnalyzeToolbar
        selectLabel={this.selectLabel}
        label="Employees"
        add={this.add}
        selected={selected}
        toggleFilter={toggleEmployeeFilter}
        isFilterVisible={employeeFilterVisible}
      />
    );
  }
}

EmployeeToolbar.propTypes = {
  selected: PropTypes.object,
  select: PropTypes.func,
  setStatus: PropTypes.func.isRequired,
  toggleEmployeeFilter: PropTypes.func,
  employeeFilterVisible: PropTypes.bool
};

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    employeeFilterVisible: state.analyze.employeeFilterVisible,
    selected: employeeSelectors.getSelectedEmployee(state)
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ ...analyzeActions }, dispatch),
    toggleEmployeeFilter: () =>
      dispatch(analyzeActions.toggleFilter(domain.EMPLOYEE))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeToolbar);
