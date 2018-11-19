export const get = () => {
  return async dispatch => {
    dispatch({ type: employeeActionTypes.GET_EMPLOYEE_REQUEST });
    try {
      const response = await endpoint.getEmployees();
      const payload = normalize(
        { employees: response.data },
        schemas.employee
      );
      return dispatch({
        type: employeeActionTypes.GET_EMPLOYEE_SUCCESS,
        payload
      });
    } catch (e) {
      console.log(e);
      return dispatch({
        type: employeeActionTypes.GET_EMPLOYEE_FAILURE,
        payload: e
      });
    }
  };
};


export const generateCRUDActions = (stateDomain, stateSchema,endpoint,params) => {

};