import { createSelector } from 'reselect';

export const getEmployeesFromEntities = state => state.entities.employees;
export const getEmployeesFromResults = state => state.results.employees;

export const getEmployeeFromState = state => state.employee;

export const getCurrentEmployee = createSelector( 
  getEmployeesFromEntities,
  getEmployeeFromState,
  ( employees, employee) => {
    return employees[employee.current]
  },
);

export const getAllEmployees = createSelector(
  getEmployeesFromEntities,getEmployeesFromResults,
  (employees,results) => {
    if (!results || results.size === 0) return null;
    return results.map(employeeId => {
      return employees[employeeId];
    }); 
  }
)



