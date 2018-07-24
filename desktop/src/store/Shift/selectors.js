import { createSelector } from 'reselect';

export const getShiftsFromEntities = state => state.entities.shifts;
export const getShiftsFromResults = state => state.results.shifts;

export const getShiftFromState = state => state.shift;

export const getCurrentShift = createSelector( 
  getShiftsFromEntities,
  getShiftsFromResults,
  getShiftFromState,
  ( shifts,results, shift) => {
    if (!results || results.size === 0) return null;
    return shifts[shift.current.id]
  },
);