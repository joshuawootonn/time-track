import { subcategoryActionTypes } from 'constants/actionTypeConstants';

import * as endpoint from './endpoints';
import { normalize } from 'normalizr';
import * as schemas from 'store/schemas';

export const getSubcategories = () => {
  return async dispatch => {
    dispatch({ type: subcategoryActionTypes.GET_SUBCATEGORIES_REQUEST });
    try {
      const response = await endpoint.getSubcategories();
      const payload = normalize({ subcategories: response.data }, schemas.subcategoryArray);
            
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



export const putSubcategory = subcategory => {
  return async dispatch => {
    dispatch({ type: subcategoryActionTypes.PUT_SUBCATEGORY_REQUEST });
    try {    
      const response = await endpoint.putSubcategory(subcategory.id, subcategory);
      const payload = normalize(
        { subcategories: [response.data] },
        schemas.subcategoryArray,
      );
      return dispatch({ type: subcategoryActionTypes.PUT_SUBCATEGORY_SUCCESS, payload });
    } catch (e) {
      console.log(e);
      return dispatch({ type: subcategoryActionTypes.PUT_SUBCATEGORY_FAILURE, payload: e });
    }
  };
};

export const postSubcategory = subcategory => {
  return async dispatch => {
    dispatch({ type: subcategoryActionTypes.POST_SUBCATEGORY_REQUEST });
    try {    
      const response = await endpoint.postSubcategory(subcategory);
      const payload = normalize(
        { subcategories: [response.data] },
        schemas.subcategoryArray,
      );
      return dispatch({ type: subcategoryActionTypes.POST_SUBCATEGORY_SUCCESS, payload });
    } catch (e) {
      console.log(e);
      return dispatch({ type: subcategoryActionTypes.POST_SUBCATEGORY_FAILURE, payload: e });
    }
  };
};




export const deleteSubcategory = subcategory => {
  return async dispatch => {
    dispatch({ type: subcategoryActionTypes.DELETE_SUBCATEGORY_REQUEST });
    try {    
      await endpoint.deleteSubcategory(subcategory);
      const deleted = {
        entities: {
          subcategories: [subcategory.id]          
        },
        result: {
          subcategories: [subcategory.id]
        }
      };

      return dispatch({ type: subcategoryActionTypes.DELETE_SUBCATEGORY_SUCCESS, deleted });
    } catch (e) {
      console.log(e);
      return dispatch({ type: subcategoryActionTypes.DELETE_SUBCATEGORY_FAILURE, payload: e });
    }
  };
};