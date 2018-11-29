import { categoryActionTypes } from 'constants/actionTypeConstants';
import { modalActions,genericActions,snackActions,analyzeActions } from 'store/actions';
import * as status from 'constants/status';
import domains from 'constants/domains';

export const getAllCategories = () => {
  return async dispatch => {    
    return dispatch(genericActions.getAll(domains.CATEGORY));
  };
};

export const editCategoriesModal = () => {  
  return modalActions.openModal(categoryActionTypes.EDIT_CATEGORIES_MODAL, null);
};

export const updateCategory = category => {
  return async dispatch => {
    dispatch({ type: categoryActionTypes.UPDATE_CATEGORY_REQUEST });
    try {
      await dispatch(genericActions.put(domains.CATEGORY,category));
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Category Updated'));
      return dispatch({ type: categoryActionTypes.UPDATE_CATEGORY_SUCCESS });      
    } catch (e) {
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Category Update Failed'));
      return dispatch({ type: categoryActionTypes.UPDATE_CATEGORY_FAILURE });
    }
  };
};

export const createCategory = category => {
  return async dispatch => {
    dispatch({ type: categoryActionTypes.CREATE_CATEGORY_REQUEST });
    try {
      await dispatch(genericActions.post(domains.CATEGORY,category));
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Category Created'));
      return dispatch({ type: categoryActionTypes.CREATE_CATEGORY_SUCCESS });      
    } catch (e) {
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Category Creation Failed'));
      return dispatch({ type: categoryActionTypes.CREATE_CATEGORY_FAILURE });
    }
  };
};
export const removeCategory = id => {
  return async dispatch => {
    dispatch({ type: categoryActionTypes.REMOVE_CATEGORY_REQUEST });
    try {
      await dispatch(analyzeActions.deleteSelected(domains.CATEGORY));
      await dispatch(genericActions.delet(domains.CATEGORY,id));

      await dispatch(snackActions.openSnack(status.SUCCESS, 'Category Deleted'));
      return dispatch({ type: categoryActionTypes.REMOVE_CATEGORY_SUCCESS });      
    } catch (e) {
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Category Deletion Failed'));
      return dispatch({ type: categoryActionTypes.REMOVE_CATEGORY_FAILURE });
    }
  };
};