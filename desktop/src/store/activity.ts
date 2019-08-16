import { ActivityState, Activity } from './types';
import { AxiosError } from 'axios';
import { Action, Dispatch } from 'redux';
import {ThunkAction } from 'redux-thunk';
import axios from 'helpers/axios'

export interface GetActivitiesRequest extends Action<'GetActivitiesRequest'> {}
export interface GetActivitiesFailure extends Action<'GetActivitiesFailure'> {
  error: AxiosError;
}
export interface GetActivitiesSuccess extends Action<'GetActivitiesSuccess'> {
  activities: Activity[];
}

export const getActivities = (): ThunkAction<void, Activity, null, GetActivitiesSuccess> => {
  return async (dispatch: Dispatch<ActivityActions>) => {
    dispatch({ type: 'GetActivitiesRequest' });
    try {
      const response = await axios.get('/api/adjudication');     
      dispatch({ type: 'GetActivitiesSuccess', activities: response.data });
      
    } catch (e) {
      dispatch({ type: 'GetActivitiesFailure', error: e });
      throw e;
    }
  };
};



export type ActivityActions = GetActivitiesSuccess | GetActivitiesFailure | GetActivitiesRequest;

const activityInitialState: ActivityState = {
  activites: { type: 'None' }
};

export const reducer = (state: ActivityState = activityInitialState, action: ActivityActions): ActivityState => {
  switch (action.type) {
    case 'GetActivitiesRequest':
      return {
        ...state,
        activites: {type:"LoadingActivities"}
      };
    case 'GetActivitiesFailure':
      return {
        ...state,
        activites: {type: 'ErrorActivities'}
      };
    case 'GetActivitiesSuccess':
      return {
        ...state,
        activites: {type: 'Activites', values: action.activities}
      };
    default:
      return state;
  }
};
