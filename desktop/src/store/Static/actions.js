import { staticActionTypes } from '~/constants/actionTypeConstants'

import {
  projectActions,
  projectTaskActions,
  taskActions,
  categoryActions,
  dimensionActions,
  subcategoryActions,
  tradeActions,
} from '~/store/actions'

export const getStaticData = () => {
  return async (dispatch) => {
    dispatch({ type: staticActionTypes.GET_STATIC_DATA_REQUEST })
    try {
      await Promise.all([
        dispatch(categoryActions.getAllCategories()),
        dispatch(dimensionActions.getAllDimensions()),
        dispatch(subcategoryActions.getAllSubcategories()),
        dispatch(projectTaskActions.getAllProjectTasks()),
        dispatch(projectActions.getAllProjects()),
        dispatch(taskActions.getAllTasks()),
        dispatch(tradeActions.getAllTrades()),
      ])
      return dispatch({ type: staticActionTypes.GET_STATIC_DATA_SUCCESS })
    } catch (e) {
      dispatch({ type: staticActionTypes.GET_STATIC_DATA_FAILURE, payload: e })
      throw e
    }
  }
}
