import { staticActionTypes } from 'constants/ActionTypes';

import { projectActions, projectTaskActions, taskActions } from 'store/actions';

export const getStaticData = () => {
  return async dispatch => {
    dispatch({ type: staticActionTypes.GET_STATIC_DATA_REQUEST });
    try {
      dispatch(projectActions.getProjects());
      dispatch(projectTaskActions.getProjectTask());
      dispatch(taskActions.getTasks());

      return dispatch({ type: staticActionTypes.GET_STATIC_DATA_SUCCESS });
    } catch (e) {
      dispatch({
        type: staticActionTypes.GET_STATIC_DATA_FAILURE,
        payload: e,
      });
      throw e;
    }
  };
};
