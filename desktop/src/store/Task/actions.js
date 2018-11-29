import { taskActionTypes } from 'constants/actionTypeConstants';
import { snackActions,genericActions,analyzeActions } from 'store/actions';
import * as status from 'constants/status';
import domains from 'constants/domains';

export const getAllTasks = () => {
  return async dispatch => {
    return dispatch(genericActions.getAll(domains.TASK));    
  };
};

export const createTask = task => {
  return async dispatch => {
    dispatch({ type: taskActionTypes.CREATE_TASK_REQUEST });
    try {
      await dispatch(genericActions.post(domains.TASK,task));
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Task Created'));
      return dispatch({ type: taskActionTypes.CREATE_TASK_SUCCESS });      
    } catch (e) {
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Task Creation Failed'));
      return dispatch({ type: taskActionTypes.CREATE_TASK_FAILURE });
    }
  };
};
export const updateTask = task => {
  return async dispatch => {
    dispatch({ type: taskActionTypes.UPDATE_TASK_REQUEST });
    try {
      await dispatch(genericActions.put(domains.TASK,task));
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Task Updated'));
      return dispatch({ type: taskActionTypes.UPDATE_TASK_SUCCESS });      
    } catch (e) {
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Task Update Failed'));
      return dispatch({ type: taskActionTypes.UPDATE_TASK_FAILURE });
    }
  };
};
export const removeTask = id => {
  return async dispatch => {
    dispatch({ type: taskActionTypes.REMOVE_TASK_REQUEST });
    try {
      await dispatch(analyzeActions.deleteSelected(domains.TASK));
      await dispatch(genericActions.delet(domains.TASK,id));

      await dispatch(snackActions.openSnack(status.SUCCESS, 'Task Deleted'));
      return dispatch({ type: taskActionTypes.REMOVE_TASK_SUCCESS });      
    } catch (e) {
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Task Deletion Failed'));
      return dispatch({ type: taskActionTypes.REMOVE_TASK_FAILURE });
    }
  };
};
