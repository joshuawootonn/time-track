import { selectedActionTypes } from 'constants/ActionTypes';

const selectedInitialState = {
  employee: {},
  project: {},
  task: {},
  shift: {}
};
export const Selected = (state = selectedInitialState, action) => {
  switch (action.type) {
  case selectedActionTypes.SELECT_EMPLOYEE:
    if(state.employee.id && state.employee.id === action.payload.id){
      return {
        ...state,
        employee: {}
      };
    }else if(state.employee){
      return {
        ...state,
        employee: state.employee
      };
    }
    return state;
         
  default:
    return state;
  }
};