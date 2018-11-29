import { staticActionTypes } from 'constants/actionTypeConstants';

import { projectActions, projectTaskActions, taskActions,categoryActions,dimensionActions,subcategoryActions } from 'store/actions';

export const getStaticData = () => {
  return async dispatch => {
    dispatch({ type: staticActionTypes.GET_STATIC_DATA_REQUEST });
    try {      
      await dispatch(categoryActions.getAllCategories());      
      await dispatch(dimensionActions.getAllDimensions());
      await dispatch(subcategoryActions.getAllSubcategories());
      await dispatch(projectTaskActions.getAllProjectTasks());
      await dispatch(projectActions.getAllProjects());      
      await dispatch(taskActions.getAllTasks());
      return dispatch({ type: staticActionTypes.GET_STATIC_DATA_SUCCESS });
    } catch (e) {
      dispatch({type: staticActionTypes.GET_STATIC_DATA_FAILURE, payload: e });
      throw e;
    }
  };
};
