import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import VirtualizedSortSelect from 'components/tables/Table';
import Progress from 'components/helpers/Progress';

import { analyzeActions } from 'store/actions';
import { shiftSelectors, activitySelectors } from 'store/selectors';

import * as TableDataTypes from 'constants/tableDataTypes';
import { analyzeStatus } from 'constants/analyze';
import domain from 'constants/domains';
import { CompositeActivity, State } from 'store/types';
import { ThunkDispatch } from 'redux-thunk';
import { ActivityActions, getActivities } from 'store/activity';

interface Props {
  activities: CompositeActivity;
}

const ActivityIndex: React.FC<Props> = (props: Props) => {
  switch (props.activities.type) {
    case 'None':
      return null;
    case 'LoadingActivities':
      return <Progress variant="circular" fullWidth fullHeight />;
    case 'NoActivities':
      return <div>No Activities found for given filters</div>;
    case 'ErrorActivities':
      return <div>Error in fetching your Activities</div>;
    case 'Activites':
      return <div>Activities found: {props.activities.values.length}</div>;
    default:
      return null;
  }
};

const mapStateToProps = (state: State) => {
  return {
    activities: state.activitySection.activites
  }
}

const  mapDispatchToProps = (dispatch: ThunkDispatch<any, any, ActivityActions>) => {
  return {
    getActivities: () => dispatch(getActivities())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ActivityIndex);

// export class ShiftIndex extends Component {
//   selectLabel = selected => `${selected.employee.firstName} ${selected.employee.lastName}'s shift selected`;

//   select = object => {
//     this.props.select(domain.SHIFT, object.shift);
//   };

//   add = () => this.props.setStatus(domain.SHIFT, analyzeStatus.ADDING);

//   render() {
//     const { selected, activities } = this.props;
//     if (!activities) return <Progress variant="circular" fullWidth fullHeight />;

//     console.log(activities[0]);

//     return (
//       <VirtualizedSortSelect
//         data={activities || []}
//         columns={rows}
//         selected={selected}
//         select={this.select}
//         initialSortBy="clockInDate"
//       />
//     );
//   }
// }

// ShiftIndex.propTypes = {
//   shifts: PropTypes.array,
//   activities: PropTypes.array,
//   select: PropTypes.func.isRequired,
//   setStatus: PropTypes.func.isRequired,
//   selected: PropTypes.object
// };

// /* istanbul ignore next */
// const mapStateToProps = state => {
//   const filters = state.analyze.shiftFilters;
//   return {
//     activities: activitySelectors.getAllActivities(state, { filters, sorts: {} }),
//     selected: shiftSelectors.getSelectedShift(state)
//   };
// };

// /* istanbul ignore next */
// const mapDispatchToProps = dispatch => {
//   return {
//     ...bindActionCreators({ ...analyzeActions }, dispatch)
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ShiftIndex);

const rows = [
  {
    id: `firstName`,
    dataKey: `employee`,
    width: 150,
    height: 56,
    padding: `dense`,
    label: `First Name`,
    type: TableDataTypes.OBJECT,
    keys: [`firstName`]
  },
  {
    id: `lastName`,
    dataKey: `employee`,
    width: 150,
    height: 56,
    padding: `dense`,
    label: `Last Name`,
    type: TableDataTypes.OBJECT,
    keys: [`lastName`]
  },
  {
    id: `project`,
    dataKey: `project`,
    width: 150,
    height: 56,
    padding: `dense`,
    label: `Project`,
    type: TableDataTypes.OBJECT,
    keys: [`name`]
  },
  {
    id: `task`,
    dataKey: `task`,
    width: 150,
    height: 56,
    padding: `dense`,
    label: `Project`,
    type: TableDataTypes.OBJECT,
    keys: [`name`]
  },
  {
    id: `clockInDate`,
    dataKey: `shift`,
    width: 200,
    height: 56,
    padding: `dense`,
    label: `Clock In`,
    type: TableDataTypes.OBJECT,
    keys: [`clockInDate`]
  },
  {
    id: `clockOutDate`,
    dataKey: `shift`,
    width: 200,
    height: 56,
    padding: `dense`,
    label: `Clock Out`,
    type: TableDataTypes.OBJECT,
    keys: [`clockOutDate`]
  },
  {
    id: `length`,
    dataKey: `length`,
    width: 120,
    height: 56,
    padding: `dense`,
    label: `Activity Length`,
    type: TableDataTypes.LENGTH
  },
  {
    id: `length`,
    dataKey: `shift`,
    width: 120,
    height: 56,
    padding: `dense`,
    label: `Shift Length`,
    type: TableDataTypes.OBJECT,
    keys: [`length`]
  }
];
