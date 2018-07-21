import { employee as employeeActionTypes } from 'constants/ActionTypes';

import * as endpoint from './endpoints';
import { normalize } from 'normalizr';
import * as schemas from 'store/schemas';

export const updateEmployee = employee => {
  console.log("here",employee)
  return dispatch => {
    dispatch({ type: employeeActionTypes.UPDATE_EMPLOYEE_REQUEST });
    const id = employee.id;
    console.log(id, employee);
    return endpoint.updateEmployee(id, employee).then(
      response => {
        const payload = normalize(
          { employees: [response.data] },
          schemas.employeeArray,
        );
        dispatch({
          type: employeeActionTypes.UPDATE_EMPLOYEE_SUCCESS,
          payload,
        });
      },
      error => {
        dispatch({
          type: employeeActionTypes.UPDATE_EMPLOYEE_FAILURE,
          payload: error,
        });
        throw error;
      },
    );
  };
};

export const toggleIsWorking = employee => {
  console.log('toggle')
  const newEmployee = {
    ...employee,
    isWorking: !employee.isWorking
  }
  return updateEmployee(newEmployee);
}
