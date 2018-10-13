import { createSelector } from 'reselect';

export const getEmployeesFromEntities = state => state.entities.employees;
export const getEmployeesFromResults = state => state.results.employees;

export const getEmployeeFromState = state => state.employee;
export const getAuthoritiesFromEntities = state => state.entities.authorities;
export const getCrewsFromEntities = state => state.entities.crews;

export const getCurrentEmployee = createSelector(
  getEmployeesFromEntities,
  getEmployeeFromState,
  (employees, employee) => {
    return employees[employee.current.id];
  },
);

export const getAllEmployees = createSelector(
  getEmployeesFromEntities,
  getEmployeesFromResults,
  (employees, results) => {
    if (!results || results.size === 0) return null;
    return results.map(employeeId => {
      return employees[employeeId];
    });
  },
);

export const getAllEmployeesWithContents = createSelector(
  getEmployeesFromEntities,
  getEmployeesFromResults,
  getCrewsFromEntities,
  getAuthoritiesFromEntities,
  (employees, results, crews, authorities) => {
    if (!results || results.size === 0) return null;
    return results.map(employeeId => {
      const emp = employees[employeeId];
      return {
        ...emp,
        authority: authorities[emp.authorityId],
        crew: crews[emp.crewId]
      };
    });
  },
);