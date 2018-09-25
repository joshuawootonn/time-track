import { createSelector } from 'reselect';
import moment from 'moment';
import { getActivitiesFromEntities } from 'store/Activity/selectors';

export const getShiftsFromEntities = state => state.entities.shifts;
export const getShiftsFromResults = state => state.results.shifts;



export const getShiftFromState = state => state.shift;

export const getCurrentShift = createSelector(
  getShiftsFromEntities,
  getShiftsFromResults,
  getShiftFromState,
  (shifts, results, shift) => {
    if (!results || results.size === 0) return null;
    return shifts[shift.current.id];
  },
);

export const getShiftsInRange = createSelector(
  getShiftsFromEntities,
  getShiftsFromResults,  
  getActivitiesFromEntities,
  (_,props) => props.startTime,
  (_,props) => props.endTime,
  (shifts,results,activities,start,end) => {
    if (!results || results.size === 0) return null;
    
    // map the shift Ids to array of shift objects 
    // while mapping activity ids to array of activities
    return results.map(shiftId => {      
      return {
        ...shifts[shiftId],
        activities: shifts[shiftId].activities.map(activityId => {
          return activities[activityId];
        }
        )
      };
    })
    // remove any shift that is not within the bounds of correct clockInDate
      .filter(shift => {      
        return moment(shift.clockInDate).isBetween(moment(start),moment(end));
      });
  }
);