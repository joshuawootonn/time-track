import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import moment from 'moment';

import { shiftActions, analyzeActions } from 'store/actions';
import { shiftSelectors } from 'store/selectors';
import SortSelectTable from 'components/tables/SortSelect';
import Progress from 'components/helpers/Progress';
import * as TableDataTypes from 'constants/tableDataTypes';
import * as analyzeStatus from 'constants/analyze';

class ShiftIndexContainer extends Component {
  componentDidMount = () => {
    this.props.getShiftsInRange(moment().subtract(14, 'days').format('MM-DD-YY HH:mm:ss'),moment().format('MM-DD-YY HH:mm:ss'));
  }
  render () {
    const { shifts } = this.props;
    console.log(shifts);
    return (
      <div>
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    shifts: shiftSelectors.getShiftsInRange(state, { startTime: moment().subtract(14, 'days').format('MM-DD-YY HH:mm:ss'), endTime: moment().format('MM-DD-YY HH:mm:ss')})
    // selected: projectSelectors.getSelectedProject(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getShiftsInRange: (start,end) => {
      return dispatch(shiftActions.getShiftsInRange(start,end));
    }
    // selectProject: project => {
    //   return dispatch(analyzeActions.selectProject(project));
    // },
    // setProjectStatus: status => {
    //   return dispatch(analyzeActions.setProjectStatus(status));
    // }
  };
};

ShiftIndexContainer.propTypes = {
  shifts: PropTypes.array,
  getShiftsInRange: PropTypes.func.isRequired
};

export default connect(mapStateToProps,mapDispatchToProps)(ShiftIndexContainer);