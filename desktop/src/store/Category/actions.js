import { categoryActionTypes } from 'constants/ActionTypes';
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
}


export const putCategory = category => {
  return async dispatch => {
    dispatch({ type: categoryActionTypes.UPDATE_CATEGORY_REQUEST });
    try {    
      const response = await endpoint.putCategory(category.id, category);
      const payload = normalize(
        { categories: [response.data] },
        schemas.categoryArray,
      );
      return dispatch({ type: categoryActionTypes.UPDATE_CATEGORY_SUCCESS, payload });
    } catch (e) {
      console.log(e);
      return dispatch({ type: categoryActionTypes.UPDATE_CATEGORY_FAILURE, payload: e });
    }
  };
};

export const postCategory = category => {
  return async dispatch => {
    dispatch({ type: categoryActionTypes.CREATE_CATEGORY_REQUEST });
    try {    
      const response = await endpoint.postCategory(category.id, category);
      const payload = normalize(
        { categories: [response.data] },
        schemas.categoryArray,
      );
      return dispatch({ type: categoryActionTypes.CREATE_CATEGORY_SUCCESS, payload });
    } catch (e) {
      console.log(e);
      return dispatch({ type: categoryActionTypes.CREATE_CATEGORY_FAILURE, payload: e });
    }
  };
};




export const deleteCategory = category => {
  return async dispatch => {
    dispatch({ type: categoryActionTypes.DELETE_CATEGORY_REQUEST });
    try {    
      const response = await endpoint.deleteCategory(category.id, category);
      const payload = normalize(
        { categories: [response.data] },
        schemas.categoryArray,
      );
      return dispatch({ type: categoryActionTypes.DELETE_CATEGORY_SUCCESS, payload });
    } catch (e) {
      console.log(e);
      return dispatch({ type: categoryActionTypes.DELETE_CATEGORY_FAILURE, payload: e });
    }
  };
};