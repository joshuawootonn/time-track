import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import moment from 'moment';

import { analyzeActions } from 'store/actions';
import { shiftSelectors } from 'store/selectors';
import AnalyzeToolbar from 'components/tables/toolbars/NewAnalyzeToolbar';
import Progress from 'components/helpers/Progress';
import { analyzeStatus } from 'constants/analyze';
import domain from 'constants/domains';

export class ShiftToolbar extends Component { 
  
  selectLabel = selected =>`${selected.employee.firstName} ${selected.employee.lastName}'s shift selected`;

  select = object => {    
    this.props.select(domain.SHIFT,object);
  }

  add = () => this.props.setStatus(domain.SHIFT,analyzeStatus.ADDING)

  render() {
    const { shifts, selected, toggleShiftFilter, shiftFilterVisible } = this.props;
    if (!shifts) return <Progress variant="circular" fullWidth fullHeight />;
    
    return (       
      <AnalyzeToolbar 
        selectLabel={this.selectLabel}
        label="Shifts"
        add={this.add}
        selected={selected}
        toggleFilter={toggleShiftFilter}
        isFilterVisible={shiftFilterVisible}
      /> 
    );
  }
}

ShiftToolbar.propTypes = {
  shifts: PropTypes.array,
  select: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  selected: PropTypes.object,
  toggleShiftFilter: PropTypes.func,
  shiftFilterVisible: PropTypes.bool
};

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    shiftFilterVisible: state.analyze.shiftFilterVisible,
    shifts: shiftSelectors.getShiftsInRange(state, { startTime: moment().subtract(400, `days`).format(`MM-DD-YY HH:mm:ss`), endTime: moment().add(14,`days`).format(`MM-DD-YY HH:mm:ss`) }),
    selected: shiftSelectors.getSelectedShift(state)
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {    
    ...bindActionCreators({ ...analyzeActions }, dispatch),
    toggleShiftFilter: () => dispatch(analyzeActions.toggleFilter(domain.SHIFT)) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShiftToolbar);
