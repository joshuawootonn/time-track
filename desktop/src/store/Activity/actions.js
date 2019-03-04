import { activityActionTypes } from 'constants/actionTypeConstants';
import { snackActions,genericActions } from 'store/actions';
import domains from 'constants/domains';
import * as status from 'constants/status';

export const createActivity = activity => {
  return async dispatch => {
    dispatch({ type: activityActionTypes.CREATE_ACTIVITY_REQUEST });
    try {
      await dispatch(genericActions.post(domains.ACTIVITY,activity));
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Activity Created'));
      return dispatch({ type: activityActionTypes.CREATE_ACTIVITY_SUCCESS });      
    } catch (e) {
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Activity Creation Failed'));
      return dispatch({ type: activityActionTypes.CREATE_ACTIVITY_FAILURE });
    }
  };
};