import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AnalyzeToolbar from 'components/tables/Toolbar';
import { analyzeActions } from 'store/actions';
import { shiftSelectors } from 'store/selectors';

import { analyzeStatus } from 'constants/analyze';
import domain from 'constants/domains';
import ShiftFilterChips from 'containers/Shift/shiftFilterChips.container';

export class ShiftToolbar extends Component {
  selectLabel = selected =>
    `${selected.employee.firstName} ${selected.employee.lastName}'s shift selected`;

  add = () => {
    const { selected, select, setStatus } = this.props;
    if (selected && selected.id) {
      select(domain.SHIFT, selected.id);
    }
    setStatus(domain.SHIFT, analyzeStatus.ADDING);
  };

  render() {
    const { selected, toggleShiftFilter, shiftFilterVisible } = this.props;

    return (
      <AnalyzeToolbar
        selectLabel={this.selectLabel}
        label="Shifts"
        add={this.add}
        selected={selected}
        toggleFilter={toggleShiftFilter}
        isFilterVisible={shiftFilterVisible}
      >
        <ShiftFilterChips />
      </AnalyzeToolbar>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  shiftFilterVisible: shiftSelectors.isShiftFilterVisible(state),
  selected: shiftSelectors.getSelectedShift(state)
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  select: (domain, payload) => dispatch(analyzeActions.select(domain, payload)),
  setStatus: (domain, payload) =>
    dispatch(analyzeActions.setStatus(domain, payload)),
  toggleShiftFilter: () => dispatch(analyzeActions.toggleFilter(domain.SHIFT))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShiftToolbar);
