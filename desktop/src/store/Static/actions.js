import { staticActionTypes } from 'constants/actionTypeConstants';

import { projectActions, projectTaskActions, taskActions,categoryActions,dimensionActions,subcategoryActions } from 'store/actions';

export const getStaticData = () => {
  return async dispatch => {
    dispatch({ type: staticActionTypes.GET_STATIC_DATA_REQUEST });
    try {
      dispatch(projectActions.getAllProjects());
      dispatch(projectTaskActions.getAllProjectTasks());
      dispatch(taskActions.getTasks());
      dispatch(categoryActions.getAllCategories());      
      dispatch(dimensionActions.getAllDimensions());
      dispatch(subcategoryActions.getAllSubcategories());


      return dispatch({ type: staticActionTypes.GET_STATIC_DATA_SUCCESS });
    } catch (e) {
      dispatch({
        type: staticActionTypes.GET_STATIC_DATA_FAILURE,
        payload: e
      });
      throw e;
    }
  };
};
