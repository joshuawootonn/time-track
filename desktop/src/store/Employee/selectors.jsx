import { createSelector } from 'reselect'
import { getAnalyzeState } from '~/store/Analyze/selectors'
import { getAllCrews, getCrewsFromEntities } from '~/store/Crew/selectors'
import { getAuthoritiesFromEntities } from '~/store/Authority/selectors'

export const getEmployeesFromEntities = (state) => state.entities.employees
export const getEmployeesFromResults = (state) => state.results.employees
export const getEmployeeFromState = (state) => state.employee

// ICEBOX: Test and migrate Employee selectors
export const getAllEmployeesNew = createSelector(
  getEmployeesFromEntities,
  getEmployeesFromResults,
  getCrewsFromEntities,
  getAuthoritiesFromEntities,
  (_, props) => (props ? props.sorts : null),
  (_, props) => (props ? props.filters : null),
  (employees, results, crews, authorities, sorts, filters) => {
    if (!results || results.length === 0) return null

    let list = results.map((employeeId) => {
      const emp = employees[employeeId]
      return {
        ...emp,
        authority: authorities[emp.authorityId],
        crew: crews[emp.crewId],
      }
    })
    // SORT
    if (sorts) {
      list = list.sort((a, b) => {
        if (a.firstName > b.firstName) return 1
        if (a.firstName < b.firstName) return -1
        return 0
      })
    }
    // FILTER
    if (filters) {
      list = list.filter((employee) => {
        let decision = true
        Object.keys(filters).forEach((key) => {
          if (
            (key === `isEmployed` || key === `isWorking`) &&
            !!employee[key] !== !!filters[key]
          ) {
            decision = false
          }
          if (
            (key === `firstName` ||
              key === `lastName` ||
              key === `pin` ||
              key === `eeNumber`) &&
            filters[key] !== `` &&
            !new RegExp(`^${filters[key]}`, `i`).test(`${employee[key]}`)
          ) {
            decision = false
          }
          if (
            (key === `crewId` || key === `authorityId`) &&
            filters[key] !== -1 &&
            filters[key] !== employee[key]
          ) {
            decision = false
          }
        })
        return decision
      })
    }
    return list
  },
)

export const getAllEmployees = createSelector(
  getEmployeesFromEntities,
  getEmployeesFromResults,
  getCrewsFromEntities,
  getAuthoritiesFromEntities,
  (employees, results, crews, authorities) => {
    if (!results || results.length === 0) return null

    return results
      .map((employeeId) => {
        const emp = employees[employeeId]
        return {
          ...emp,
          authority: authorities[emp.authorityId],
          crew: crews[emp.crewId],
        }
      })
      .sort((a, b) => {
        if (a.firstName > b.firstName) return 1
        if (a.firstName < b.firstName) return -1
        return 0
      })
  },
)

export const getActiveEmployees = createSelector(
  getEmployeesFromEntities,
  getEmployeesFromResults,
  getCrewsFromEntities,
  getAuthoritiesFromEntities,
  (employees, results, crews, authorities) => {
    if (!results || results.length === 0) return null

    return results
      .map((employeeId) => {
        const emp = employees[employeeId]
        return {
          ...emp,
          authority: authorities[emp.authorityId],
          crew: crews[emp.crewId],
        }
      })
      .filter((employee) => {
        return !!employee.isEmployed
      })
      .sort((a, b) => {
        if (a.firstName > b.firstName) return 1
        if (a.firstName < b.firstName) return -1
        return 0
      })
  },
)

export const getSelectedEmployee = createSelector(
  getEmployeesFromEntities,
  getAnalyzeState,
  (employees, analyze) => {
    if (analyze.employee === -1) return {}
    else return employees[analyze.employee]
  },
)
export const getCurrentEmployee = createSelector(
  getEmployeesFromEntities,
  getEmployeeFromState,
  (employees, employee) => {
    if (employee.current && employee.current.id)
      return employees[employee.current.id]
    else return {}
  },
)

export const getAllEmployeeObjects = createSelector(
  getAllEmployees,
  (employees) => {
    if (!employees) return null
    return Object.assign(
      {},
      ...employees.map((employee) => ({
        [employee.id]: employee,
      })),
    )
  },
)
