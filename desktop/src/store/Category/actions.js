import { categoryActionTypes } from 'constants/ActionTypes';

import * as endpoint from './endpoints';
import { normalize } from 'normalizr';
import * as schemas from 'store/schemas';

export const getCategories = () => {
  return async dispatch => {
    dispatch({ type: categoryActionTypes.GET_CATEGORIES_REQUEST });
    try {
      const response = await endpoint.getCategories();
      const payload = normalize(
        { categories: response.data },
        schemas.categoryArray,
      );
      return dispatch({
        type: categoryActionTypes.GET_CATEGORIES_SUCCESS,
        payload
      });
    } catch (e) {
      dispatch({
        type: categoryActionTypes.GET_CATEGORIES_FAILURE,
        payload: e
      });
    }
  };
};
