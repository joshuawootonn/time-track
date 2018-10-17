import { subcategoryActionTypes } from 'constants/ActionTypes';

import * as endpoint from './endpoints';
import { normalize } from 'normalizr';
import * as schemas from 'store/schemas';

export const getSubcategories = () => {
  return async dispatch => {
    dispatch({ type: subcategoryActionTypes.GET_SUBCATEGORIES_REQUEST });
    try {
      const response = await endpoint.getSubcategories();
      const payload = normalize(
        {subcategories: response.data } ,
        schemas.subcategoryArray,
      );
      console.log('fml',{ subcategories: response.data },response.data,payload);
      return dispatch({
        type: subcategoryActionTypes.GET_SUBCATEGORIES_SUCCESS,
        payload
      });
    } catch (e) {
      dispatch({
        type: subcategoryActionTypes.GET_SUBCATEGORIES_FAILURE,
        payload: e
      });
    }
  };
};
