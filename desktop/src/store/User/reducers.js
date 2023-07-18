import { userActionTypes } from '~/constants/actionTypeConstants'
import * as status from '~/constants/status'
export const initialState = { status: status.INIT }

export default (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.LOGIN_USER_REQUEST:
      return {
        ...state,
        status: status.LOADING,
      }
    case userActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        id: action.payload.userId,
        access: action.payload.id,
        status: status.SUCCESS,
      }
    case userActionTypes.LOGIN_USER_FAILURE:
      return {
        ...state,
        status: status.FAILURE,
      }

    default:
      return state
  }
}
