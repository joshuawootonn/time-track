import { createSelector } from 'reselect';
import moment from 'moment';
import { getActivitiesFromEntities } from 'store/Activity/selectors';
import { getEmployeesFromEntities } from 'store/Employee/selectors';
import { getAllProjectTasksObjects } from 'store/ProjectTask/selectors';

export const getShiftsFromEntities = state => state.entities.shifts;
export const getShiftsFromResults = state => state.results.shifts;


export const getAnalyzeState = state => state.analyze;

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
  getEmployeesFromEntities,
  (_,props) => props.startTime,
  (_,props) => props.endTime,
  (shifts,results,activities,employees,start,end) => {
    if (!results || results.size === 0) return null;
    
    // map the shift Ids to array of shift objects 
    // while mapping activity ids to array of activities
    return results.map(shiftId => {      
      return {
        ...shifts[shiftId],
        employee: shifts[shiftId] && employees[shifts[shiftId].employeeId],
        activities: shifts[shiftId] && shifts[shiftId].activities && shifts[shiftId].activities.map(activityId => {
          return activities[activityId];
        })
      };
    }).filter(shift => {    // remove any shift that is not within the bounds of correct clockInDate
      return moment(shift.clockInDate).isBetween(moment(start,'MM-DD-YY HH:mm:ss'),moment(end,'MM-DD-YY HH:mm:ss'));
    });      
  }
);

export const getSelectedShift = createSelector(
  getShiftsFromEntities,
  getActivitiesFromEntities,
  getAllProjectTasksObjects,  
  getEmployeesFromEntities,
  getAnalyzeState,
  (shifts,activities,projectTasks,employees, analyze) => {
    if(analyze.shift === -1)
      return {};
    else{
      return {
        ...shifts[analyze.shift],
        employee: shifts[analyze.shift] && employees[shifts[analyze.shift].employeeId],
        activities: shifts[analyze.shift] && shifts[analyze.shift].activities && shifts[analyze.shift].activities.map(activityId => {
          console.log(projectTasks,activities[activityId])
          return {
            ...activities[activityId],
            projectTask: projectTasks[activities[activityId].projectTaskId]
          };
        })
      };
    }      
  }
);