import { projectTaskActionTypes } from 'constants/actionTypeConstants';
import { genericActions, snackActions, analyzeActions } from 'store/actions';
import domains from 'constants/domains';
import * as status from 'constants/status';

export const getAllProjectTasks = () => {
  return async dispatch => {
    return dispatch(genericActions.getAll(domains.PROJECTTASK));
  };
};

export const createProjectTask = projectTask => {
  return async dispatch => {
    dispatch({ type: projectTaskActionTypes.CREATE_PROJECT_TASK_REQUEST });
    try {
      await dispatch(genericActions.post(domains.PROJECTTASK, projectTask));
      await dispatch(
        snackActions.openSnack(status.SUCCESS, `Project Task Created`)
      );
      return dispatch({
        type: projectTaskActionTypes.CREATE_PROJECT_TASK_SUCCESS
      });
    } catch (e) {
      await dispatch(
        snackActions.openSnack(status.SUCCESS, `Project Task Creation Failed`)
      );
      return dispatch({
        type: projectTaskActionTypes.CREATE_PROJECT_TASK_FAILURE
      });
    }
  };
};
export const updateProjectTask = projectTask => {
  return async dispatch => {
    dispatch({ type: projectTaskActionTypes.UPDATE_PROJECT_TASK_REQUEST });
    try {
      await dispatch(genericActions.put(domains.PROJECTTASK, projectTask));
      await dispatch(
        snackActions.openSnack(status.SUCCESS, `Project Task Updated`)
      );
      return dispatch({
        type: projectTaskActionTypes.UPDATE_PROJECT_TASK_SUCCESS
      });
    } catch (e) {
      await dispatch(
        snackActions.openSnack(status.SUCCESS, `Project Task Update Failed`)
      );
      return dispatch({
        type: projectTaskActionTypes.UPDATE_PROJECT_TASK_FAILURE
      });
    }
  };
};

export const removeProjectTask = id => {
  return async dispatch => {
    dispatch({ type: projectTaskActionTypes.REMOVE_PROJECT_TASK_REQUEST });
    try {
      await dispatch(analyzeActions.deleteSelected(domains.PROJECTTASK));
      await dispatch(genericActions.delet(domains.PROJECTTASK, id));

      await dispatch(
        snackActions.openSnack(status.SUCCESS, `Project Task Deleted`)
      );
      return dispatch({
        type: projectTaskActionTypes.REMOVE_PROJECT_TASK_SUCCESS
      });
    } catch (e) {
      await dispatch(
        snackActions.openSnack(status.SUCCESS, `Project Task Deletion Failed`)
      );
      return dispatch({
        type: projectTaskActionTypes.REMOVE_PROJECT_TASK_FAILURE
      });
    }
  };
};
