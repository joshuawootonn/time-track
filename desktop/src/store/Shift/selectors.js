import { createSelector } from 'reselect';
import moment from 'moment'
import {getAllActivityObjects} from 'store/Activity/selectors'

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
  getAllActivityObjects,
  (_,props) => props.startTime,
  (_,props) => props.endTime,
  (shifts,results,activtyObjects,start,end) => {
    if (!results || results.size === 0) return null;
    return results.map(shiftId => {
      return shifts[shiftId];
    }).filter((shift) => {      
      return moment(shift.clockInDate).isBetween(moment(start),moment(end))
    });
  }
)