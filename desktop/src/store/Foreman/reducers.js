import { foremanActionTypes } from '~/constants/actionTypeConstants'

export const initialState = {
  projectId: -1,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case foremanActionTypes.UPDATE_FILTERS:
      return {
        ...state,
        projectId: action.projectId,
      }
    default:
      return state
  }
}
