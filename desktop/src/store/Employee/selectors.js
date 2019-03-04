import { createSelector } from 'reselect';
import { getAnalyzeState } from 'store/Analyze/selectors';
import { getCrewsFromEntities } from 'store/Crew/selectors';
import { getAuthoritiesFromEntities } from 'store/Authority/selectors';

export const getEmployeesFromEntities = state => state.entities.employees;
export const getEmployeesFromResults = state => state.results.employees;
export const getEmployeeFromState = state => state.employee;


export const getAllEmployees = createSelector(
  getEmployeesFromEntities,
  getEmployeesFromResults,
  (employees, results) => {
    if (!results || results.length === 0) return null;
    return results.map(employeeId => {
      return employees[employeeId];
    }).sort((a,b) => {
      if(a.firstName > b.firstName) return 1;
      if(a.firstName < b.firstName) return -1;
      return 0;
    })
  },
);
export const getSelectedEmployee = createSelector(
  getEmployeesFromEntities,
  getAnalyzeState,
  (employees, analyze) => {
    if(analyze.employee === -1) 
      return {};
    else 
      return employees[analyze.employee];
  }
);
export const getCurrentEmployee = createSelector(
  getEmployeesFromEntities,
  getEmployeeFromState,
  (employees, employee) => {
    if(employee.current && employee.current.id)
      return employees[employee.current.id];
    else 
      return {};
  },
);
export const getAllEmployeesWithContents = createSelector(
  getEmployeesFromEntities,
  getEmployeesFromResults,
  getCrewsFromEntities,
  getAuthoritiesFromEntities,
  (employees, results, crews, authorities) => {
    if (!results || results.length === 0) return null;
    return results.map(employeeId => {
      const emp = employees[employeeId];
      return {
        ...emp,
        authority: authorities[emp.authorityId],
        crew: crews[emp.crewId]
      };
    }).sort((a,b) => {
      if(a.firstName > b.firstName) return 1;
      if(a.firstName < b.firstName) return -1;
      return 0;
    });
  },
);

