import {activityActionTypes} from 'constants/ActionTypes'

import * as endpoint from './endpoints';
import { normalize } from 'normalizr';
import * as schemas from 'store/schemas';

export const postActivity = activity => {
  return async dispatch => {
    dispatch({ type: activityActionTypes.POST_ACTIVITY_REQUEST });
    try {
      const response = await endpoint.postActivity(activity);
      const payload = normalize(
        { activities: [response.data] },
        schemas.activityArray,
      );
      return dispatch({ type: activityActionTypes.POST_ACTIVITY_SUCCESS, payload });
    } catch (e) {
      console.log(e);
      return dispatch({
        type: activityActionTypes.POST_ACTIVITY_FAILURE,
        payload: e,
      });
      throw e;
    }
  };
}