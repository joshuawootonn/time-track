import { shiftActionTypes } from '~/constants/actionTypeConstants'
import * as status from '~/constants/status'

export const initialState = {
  current: {
    id: null,
    status: status.INIT,
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case shiftActionTypes.GET_CURRENT_SHIFT_REQUEST:
      return {
        ...state,
        current: {
          id: null,
          status: status.LOADING,
        },
      }
    case shiftActionTypes.GET_CURRENT_SHIFT_SUCCESS:
      return {
        ...state,
        current: {
          id: action.data.id,
          status: status.SUCCESS,
        },
      }
    case shiftActionTypes.GET_CURRENT_SHIFT_FAILURE:
      return {
        ...state,
        current: {
          id: null,
          status: status.FAILURE,
        },
      }

    default:
      return state
  }
}
