import { createSelector } from 'reselect';
import moment from 'moment';
import { getActivitiesFromEntities } from 'store/Activity/selectors';
import { getEmployeesFromEntities } from 'store/Employee/selectors';
import { getProjectTasksFromEntities } from 'store/ProjectTask/selectors';
import { getAllProjectTasksObjects } from 'store/ProjectTask/selectors';
import { getAnalyzeState } from 'store/Analyze/selectors';
import { getAllCrewObjects, getCrewsFromEntities } from 'store/Crew/selectors';

export const getShiftsFromEntities = state => state.entities.shifts;
export const getShiftsFromResults = state => state.results.shifts;

export const getShiftFromState = state => state.shift;
export const getEmployeeFromState = state => state.employee;

export const getCurrentShift = createSelector(
  getShiftsFromEntities,
  getShiftsFromResults,
  getShiftFromState,
  (shifts, results, shift) => {
    if (!results || results.length === 0) return null;
    return shifts[shift.current.id];
  }
);

// ICEBOX: Test and migrate Shift selectors
export const getAllShiftsNew = createSelector(
  getShiftsFromEntities,
  getShiftsFromResults,
  getActivitiesFromEntities,
  getEmployeesFromEntities,
  getAllProjectTasksObjects,
  getAllCrewObjects,
  (_, props) => (props ? props.sorts : null),
  (_, props) => (props ? props.filters : null),
  (
    shifts,
    results,
    activities,
    employees,
    projectTasks,
    crews,
    sorts,
    filters
  ) => {
    if (!results || results.length === 0) return null;

    let list = results.map(shiftId => {
      return {
        ...shifts[shiftId],
        length:
          shifts[shiftId].length && shifts[shiftId].lunch
            ? shifts[shiftId].length - shifts[shiftId].lunch
            : shifts[shiftId].length,
        employee: shifts[shiftId] && {
          ...employees[shifts[shiftId].employeeId],
          crew: crews[employees[shifts[shiftId].employeeId].crewId]
        },
        activities:
          shifts[shiftId] &&
          shifts[shiftId].activities &&
          shifts[shiftId].activities.map(activityId => {
            return {
              ...activities[activityId],
              projectTask: projectTasks[activities[activityId].projectTaskId]
            };
          })
      };
    });

    if (sorts) {
      // TODO: Add sorting to getAllShifts
    }

    if (filters) {
      list = list.filter(shift => {
        let decision = true;
        Object.keys(filters).forEach(key => {
          if (
            key === `startTime` &&
            moment(shift[`clockInDate`]).isBefore(
              moment(filters[key], `MM-DD-YY HH:mm:ss`)
            )
          ) {
            decision = false;
          }
          // if(key === `startTime` ){
          //   console.log(moment(shift[`clockInDate`]), moment(filters[key],`MM-DD-YY HH:mm:ss`), moment(shift[key]).isBefore(moment(filters[key],`MM-DD-YY HH:mm:ss`)))
          // }
          if (
            key === `endTime` &&
            moment(shift[`clockInDate`]).isAfter(
              moment(filters[key], `MM-DD-YY HH:mm:ss`)
            )
          ) {
            decision = false;
          }
          if (
            key === `employeeId` &&
            filters[key] !== -1 &&
            filters[key] !== shift[key]
          ) {
            decision = false;
          }
          if (
            (key === `authorityId` || key === `crewId`) &&
            filters[key] !== -1 &&
            filters[key] !== shift[`employee`][key]
          ) {
            decision = false;
          }
          if (key === `projectId` && filters[key] !== -1) {
            let projectDecision = false;

            shift[`activities`].forEach(activity => {
              if (
                projectTasks[activity.projectTaskId].projectId === filters[key]
              ) {
                projectDecision = true;
              }
            });
            decision = projectDecision;
          }
          if (key === `taskId` && filters[key] !== -1) {
            let taskDecision = false;

            shift[`activities`].forEach(activity => {
              if (
                projectTasks[activity.projectTaskId].taskId === filters[key]
              ) {
                taskDecision = true;
              }
            });
            decision = taskDecision;
          }
        });
        return decision;
      });
    }
    // console.log(`List after filter:`, list.length);
    return list;
  }
);

export const getLastWeeksShiftsForCurrentEmployee = createSelector(
  getShiftsFromEntities,
  getShiftsFromResults,
  getActivitiesFromEntities,
  getEmployeesFromEntities,
  getEmployeeFromState,
  (shifts, results, activities, employees, employee) => {
    if (!shifts || shifts.length === 0) return [];

    return results
      .map(shiftId => {
        return {
          ...shifts[shiftId],
          length:
            shifts[shiftId].length && shifts[shiftId].lunch
              ? shifts[shiftId].length - shifts[shiftId].lunch
              : shifts[shiftId].length
        };
      })
      .filter(shift => {
        return shift.employeeId === employee.current.id;
      })
      .filter(shift => {
        // remove any shift that is not within the bounds of correct clockInDate
        return moment(shift.clockInDate).isBetween(
          moment().startOf(`week`),
          moment().endOf(`week`)
        );
      })
      .map(shift => {
        return {
          ...shift,
          employee: shift && employees[shift.employeeId],
          activities:
            shift &&
            shift.activities &&
            shift.activities.map(activityId => {
              return activities[activityId];
            })
        };
      });
  }
);

export const getShiftsInRange = createSelector(
  getShiftsFromEntities,
  getShiftsFromResults,
  getActivitiesFromEntities,
  getEmployeesFromEntities,
  (_, props) => props.startTime,
  (_, props) => props.endTime,
  (shifts, results, activities, employees, start, end) => {
    if (!results || results.length === 0) return null;
    //console.log('shift selectors',start, end)
    // map the shift Ids to array of shift objects
    // while mapping activity ids to array of activities
    //console.log(results);
    return results
      .slice(-200)
      .map(shiftId => {
        return {
          ...shifts[shiftId],
          length:
            shifts[shiftId].length && shifts[shiftId].lunch
              ? shifts[shiftId].length - shifts[shiftId].lunch
              : shifts[shiftId].length,
          employee: shifts[shiftId] && employees[shifts[shiftId].employeeId],
          activities:
            shifts[shiftId] &&
            shifts[shiftId].activities &&
            shifts[shiftId].activities.map(activityId => {
              return activities[activityId];
            })
        };
      })
      .filter(shift => {
        // remove any shift that is not within the bounds of correct clockInDate
        //console.log(shift, start, end, moment(shift.clockInDate).isBetween(moment(start,`MM-DD-YY HH:mm:ss`),moment(end,`MM-DD-YY HH:mm:ss`)))
        return moment(shift.clockInDate).isBetween(
          moment(start, `MM-DD-YY HH:mm:ss`),
          moment(end, `MM-DD-YY HH:mm:ss`)
        );
      });
  }
);

//TODO REMOVE THIS DUPLICATE... LOOK FOR THE SLICE
export const getShiftsInRangeForExport = createSelector(
  getShiftsFromEntities,
  getShiftsFromResults,
  getActivitiesFromEntities,
  getEmployeesFromEntities,
  (_, props) => props.startTime,
  (_, props) => props.endTime,
  (shifts, results, activities, employees, start, end) => {
    if (!results || results.length === 0) return null;
    //console.log('shift selectors',start, end)
    // map the shift Ids to array of shift objects
    // while mapping activity ids to array of activities
    //console.log(results);
    return results
      .map(shiftId => {
        return {
          ...shifts[shiftId],
          length:
            shifts[shiftId].length && shifts[shiftId].lunch
              ? shifts[shiftId].length - shifts[shiftId].lunch
              : shifts[shiftId].length,
          employee: shifts[shiftId] && employees[shifts[shiftId].employeeId],
          activities:
            shifts[shiftId] &&
            shifts[shiftId].activities &&
            shifts[shiftId].activities.map(activityId => {
              return activities[activityId];
            })
        };
      })
      .filter(shift => {
        // remove any shift that is not within the bounds of correct clockInDate
        //console.log(shift, start, end, moment(shift.clockInDate).isBetween(moment(start,`MM-DD-YY HH:mm:ss`),moment(end,`MM-DD-YY HH:mm:ss`)))
        return moment(shift.clockInDate).isBetween(
          moment(start, `MM-DD-YY HH:mm:ss`),
          moment(end, `MM-DD-YY HH:mm:ss`)
        );
      });
  }
);

export const getSelectedShift = createSelector(
  getShiftsFromEntities,
  getActivitiesFromEntities,
  getAllProjectTasksObjects,
  getEmployeesFromEntities,
  getAnalyzeState,
  (shifts, activities, projectTasks, employees, analyze) => {
    if (analyze.shift === -1) return {};
    else {
      return {
        ...shifts[analyze.shift],
        employee:
          shifts[analyze.shift] && employees[shifts[analyze.shift].employeeId],
        activities:
          shifts[analyze.shift] &&
          shifts[analyze.shift].activities &&
          shifts[analyze.shift].activities.map(activityId => {
            return {
              ...activities[activityId],
              projectTask: projectTasks[activities[activityId].projectTaskId]
            };
          })
      };
    }
  }
);
