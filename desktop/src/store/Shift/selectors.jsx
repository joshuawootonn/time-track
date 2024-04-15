import { createSelector } from 'reselect'
import moment from 'moment'
import { getActivitiesFromEntities } from '~/store/Activity/selectors'
import { getEmployeesFromEntities } from '~/store/Employee/selectors'
import { getProjectTasksFromEntities } from '~/store/ProjectTask/selectors'
import { getAllProjectTasksObjects } from '~/store/ProjectTask/selectors'
import { getAnalyzeState } from '~/store/Analyze/selectors'
import { getAllCrewObjects, getCrewsFromEntities } from '~/store/Crew/selectors'

export const getShiftsFromEntities = (state) => state.entities.shifts
export const getShiftsFromResults = (state) => state.results.shifts

export const getShiftFromState = (state) => state.shift
export const getEmployeeFromState = (state) => state.employee

export const isShiftFilterVisible = createSelector(
  (state) => state.analyze.shiftFilterVisible,
  (filters) => filters,
)

export const getCurrentShift = createSelector(
  getShiftsFromEntities,
  getShiftsFromResults,
  getEmployeeFromState,
  (shifts, results, employee) => {

    if (!results || results.length === 0) return null

    let employeesHalfShifts = Object.values(shifts).filter(s => s.employeeId === employee.current.id && s.clockOutDate === null);
    let mostRecentHalfShift = employeesHalfShifts.sort((a,b) => { return ( new Date (b.clockInDate) - new Date (a.clockInDate) ) })[0];
    
    return mostRecentHalfShift;
  },
)

export const getShiftFilters = createSelector(
  (state) => state.analyze.shiftFilters,
  (filters) => filters,
)

// ICEBOX: Test and migrate Shift selectors
export const getAllShiftsNew = createSelector(
  getShiftsFromEntities,
  getShiftsFromResults,
  getActivitiesFromEntities,
  getEmployeesFromEntities,
  getAllProjectTasksObjects,
  getAllCrewObjects,
  getShiftFilters,
  (shifts, results, activities, employees, projectTasks, crews, filters) => {
    if (!results || results.length === 0) return null

    let list = results.map((shiftId) => {
      return {
        ...shifts[shiftId],
        length:
          shifts[shiftId].length && shifts[shiftId].lunch
            ? shifts[shiftId].length - shifts[shiftId].lunch
            : shifts[shiftId].length,
        employee: shifts[shiftId] && {
          ...employees[shifts[shiftId].employeeId],
          crew: crews[employees[shifts[shiftId].employeeId].crewId],
        },
        activities:
          shifts[shiftId] &&
          shifts[shiftId].activities &&
          shifts[shiftId].activities.map((activityId) => {
            return {
              ...activities[activityId],
              projectTask: projectTasks[activities[activityId].projectTaskId],
            }
          }),
      }
    })

    if (filters) {
      list = list.filter((shift) => {
        if (
          filters.employeeId !== -1 &&
          filters.employeeId !== shift.employeeId
        ) {
          return false
        }
        if (
          filters.crewId !== -1 &&
          filters.crewId !== shift[`employee`].crewId
        ) {
          return false
        }

        if (filters.projectId !== -1 || filters.taskId !== -1) {
          const matches = shift.activities.reduce((acc, curr) => {
            if (
              filters.projectId !== -1 &&
              filters.taskId !== -1 &&
              projectTasks[curr.projectTaskId].projectId ===
                filters.projectId &&
              projectTasks[curr.projectTaskId].taskId === filters.taskId
            ) {
              return true
            }
            if (
              filters.taskId === -1 &&
              filters.projectId !== -1 &&
              projectTasks[curr.projectTaskId].projectId === filters.projectId
            ) {
              return true
            }
            if (
              filters.projectId === -1 &&
              filters.taskId !== -1 &&
              projectTasks[curr.projectTaskId].taskId === filters.taskId
            ) {
              return true
            }
            return acc
          }, false)

          if (!matches) {
            return false
          }
        }

        if (
          moment(shift[`clockInDate`]).isBefore(
            moment(filters.startTime, `MM-DD-YY HH:mm:ss`),
          )
        ) {
          return false
        }
        if (
          moment(shift[`clockInDate`]).isAfter(
            moment(filters.endTime, `MM-DD-YY HH:mm:ss`),
          )
        ) {
          return false
        }
        return true
      })
    }
    // console.log(`List after filter:`, list.length);
    return list
  },
)

export const getAllShiftsInLastMonth = createSelector(
  getShiftsFromEntities,
  getShiftsFromResults,
  getActivitiesFromEntities,
  getEmployeesFromEntities,
  getAllProjectTasksObjects,
  getAllCrewObjects,
  (shifts, results, activities, employees, projectTasks, crews) => {
    if (!results || results.length === 0) return null

    let list = results.map((shiftId) => {
      return {
        ...shifts[shiftId],
        length:
          shifts[shiftId].length && shifts[shiftId].lunch
            ? shifts[shiftId].length - shifts[shiftId].lunch
            : shifts[shiftId].length,
        employee: shifts[shiftId] && {
          ...employees[shifts[shiftId].employeeId],
          crew: crews[employees[shifts[shiftId].employeeId].crewId],
        },
        activities:
          shifts[shiftId] &&
          shifts[shiftId].activities &&
          shifts[shiftId].activities.map((activityId) => {
            return {
              ...activities[activityId],
              projectTask: projectTasks[activities[activityId].projectTaskId],
            }
          }),
      }
    })

    list = list.filter((shift) => {
      if (
        moment(shift[`clockInDate`]).isBefore(
          moment().subtract(31, `days`).format(`MM-DD-YY HH:mm:ss`),
        )
      ) {
        return false
      }
      return true
    })

    return list
  },
)

export const getShiftTotals = createSelector(
  getAllShiftsNew,
  getAllProjectTasksObjects,
  getShiftFilters,
  (shifts, projectTasks, filters) => {
    return shifts.reduce((acc, currentShift) => {
      const activityTotal = currentShift[`activities`]
        ? currentShift[`activities`].reduce((acc, curr) => {
            if (filters.projectId === -1 && filters.taskId === -1) {
              return acc + curr.length
            }
            if (
              filters.projectId !== -1 &&
              filters.taskId !== -1 &&
              projectTasks[curr.projectTaskId].projectId ===
                filters.projectId &&
              projectTasks[curr.projectTaskId].taskId === filters.taskId
            ) {
              return acc + curr.length
            }
            if (
              filters.taskId === -1 &&
              filters.projectId !== -1 &&
              projectTasks[curr.projectTaskId].projectId === filters.projectId
            ) {
              return acc + curr.length
            }
            if (
              filters.projectId === -1 &&
              filters.taskId !== -1 &&
              projectTasks[curr.projectTaskId].taskId === filters.taskId
            ) {
              return acc + curr.length
            }
            return acc
          }, 0)
        : 0
      return acc + activityTotal
    }, 0)
  },
)

export const getLastWeeksShiftsForCurrentEmployee = createSelector(
  getShiftsFromEntities,
  getShiftsFromResults,
  getActivitiesFromEntities,
  getEmployeesFromEntities,
  getEmployeeFromState,
  (shifts, results, activities, employees, employee) => {
    if (!shifts || shifts.length === 0) return []

    return results
      .map((shiftId) => {
        return {
          ...shifts[shiftId],
          length:
            shifts[shiftId].length && shifts[shiftId].lunch
              ? shifts[shiftId].length - shifts[shiftId].lunch
              : shifts[shiftId].length,
        }
      })
      .filter((shift) => {
        return shift.employeeId === employee.current.id
      })
      .filter((shift) => {
        // remove any shift that is not within the bounds of correct clockInDate
        return moment(shift.clockInDate).isBetween(
          moment().startOf(`week`),
          moment().endOf(`week`),
        )
      })
      .map((shift) => {
        return {
          ...shift,
          employee: shift && employees[shift.employeeId],
          activities:
            shift &&
            shift.activities &&
            shift.activities.map((activityId) => {
              return activities[activityId]
            }),
        }
      })
  },
)

export const getShiftsInRange = createSelector(
  getShiftsFromEntities,
  getShiftsFromResults,
  getActivitiesFromEntities,
  getEmployeesFromEntities,
  (_, props) => props.startTime,
  (_, props) => props.endTime,
  (shifts, results, activities, employees, start, end) => {
    if (!results || results.length === 0) return null
    //console.log('shift selectors',start, end)
    // map the shift Ids to array of shift objects
    // while mapping activity ids to array of activities
    //console.log(results);
    return results
      .slice(-200)
      .map((shiftId) => {
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
            shifts[shiftId].activities.map((activityId) => {
              return activities[activityId]
            }),
        }
      })
      .filter((shift) => {
        // remove any shift that is not within the bounds of correct clockInDate
        //console.log(shift, start, end, moment(shift.clockInDate).isBetween(moment(start,`MM-DD-YY HH:mm:ss`),moment(end,`MM-DD-YY HH:mm:ss`)))
        return moment(shift.clockInDate).isBetween(
          moment(start, `MM-DD-YY HH:mm:ss`),
          moment(end, `MM-DD-YY HH:mm:ss`),
        )
      })
  },
)

//TODO REMOVE THIS DUPLICATE... LOOK FOR THE SLICE
export const getShiftsInRangeForExport = createSelector(
  getShiftsFromEntities,
  getShiftsFromResults,
  getActivitiesFromEntities,
  getEmployeesFromEntities,
  (_, props) => props.startTime,
  (_, props) => props.endTime,
  (shifts, results, activities, employees, start, end) => {
    if (!results || results.length === 0) return null
    //console.log('shift selectors',start, end)
    // map the shift Ids to array of shift objects
    // while mapping activity ids to array of activities
    //console.log(results);
    return results
      .map((shiftId) => {
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
            shifts[shiftId].activities.map((activityId) => {
              return activities[activityId]
            }),
        }
      })
      .filter((shift) => {
        // remove any shift that is not within the bounds of correct clockInDate
        //console.log(shift, start, end, moment(shift.clockInDate).isBetween(moment(start,`MM-DD-YY HH:mm:ss`),moment(end,`MM-DD-YY HH:mm:ss`)))
        return moment
          .utc(shift.clockInDate)
          .local()
          .isBetween(moment.utc(start).local(), moment.utc(end).local())
      })
  },
)

export const getSelectedShift = createSelector(
  getShiftsFromEntities,
  getActivitiesFromEntities,
  getAllProjectTasksObjects,
  getEmployeesFromEntities,
  getAnalyzeState,
  (shifts, activities, projectTasks, employees, analyze) => {
    if (analyze.shift === -1) return {}
    else {
      return {
        ...shifts[analyze.shift],
        employee:
          shifts[analyze.shift] && employees[shifts[analyze.shift].employeeId],
        activities:
          shifts[analyze.shift] &&
          shifts[analyze.shift].activities &&
          shifts[analyze.shift].activities.map((activityId) => {
            return {
              ...activities[activityId],
              projectTask: projectTasks[activities[activityId].projectTaskId],
            }
          }),
      }
    }
  },
)
