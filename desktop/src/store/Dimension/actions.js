import { dimensionActionTypes } from 'constants/ActionTypes';

import * as endpoint from './endpoints';
import { normalize } from 'normalizr';
import * as schemas from 'store/schemas';

export const getDimensions = () => {
  return async dispatch => {
    dispatch({ type: dimensionActionTypes.GET_DIMENSIONS_REQUEST });
    try {
      const response = await endpoint.getDimensions();
      const payload = normalize(
        { dimensions: response.data },
        schemas.dimensionArray,
      );
      console.log('d',response.data,payload);
      return dispatch({
        type: dimensionActionTypes.GET_DIMENSIONS_SUCCESS,
        payload
      });
    } catch (e) {
      dispatch({
        type: dimensionActionTypes.GET_DIMENSIONS_FAILURE,
        payload: e
      });
    }
  };
};
