import { categoryActionTypes } from 'constants/actionTypeConstants';
import { modalActions } from 'store/actions';

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


export const editCategoriesModal = () => {  
  return modalActions.openModal(categoryActionTypes.EDIT_CATEGORIES_MODAL, null);
};


export const putCategory = category => {
  return async dispatch => {
    dispatch({ type: categoryActionTypes.PUT_CATEGORY_REQUEST });
    try {    
      const response = await endpoint.putCategory(category.id, category);
      const payload = normalize(
        { categories: [response.data] },
        schemas.categoryArray,
      );
      return dispatch({ type: categoryActionTypes.PUT_CATEGORY_SUCCESS, payload });
    } catch (e) {
      console.log(e);
      return dispatch({ type: categoryActionTypes.PUT_CATEGORY_FAILURE, payload: e });
    }
  };
};

export const postCategory = category => {
  return async dispatch => {
    dispatch({ type: categoryActionTypes.POST_CATEGORY_REQUEST });
    try {    
      const response = await endpoint.postCategory(category);
      const payload = normalize(
        { categories: [response.data] },
        schemas.categoryArray,
      );
      return dispatch({ type: categoryActionTypes.POST_CATEGORY_SUCCESS, payload });
    } catch (e) {
      console.log(e);
      return dispatch({ type: categoryActionTypes.POST_CATEGORY_FAILURE, payload: e });
    }
  };
};




export const deleteCategory = category => {
  return async dispatch => {
    dispatch({ type: categoryActionTypes.DELETE_CATEGORY_REQUEST });
    try {    
      await endpoint.deleteCategory(category);
      const deleted = {
        entities: {
          categories: [category.id]          
        },
        result: {
          categories: [category.id]
        }
      };

      return dispatch({ type: categoryActionTypes.DELETE_CATEGORY_SUCCESS, deleted });
    } catch (e) {
      console.log(e);
      return dispatch({ type: categoryActionTypes.DELETE_CATEGORY_FAILURE, payload: e });
    }
  };
};