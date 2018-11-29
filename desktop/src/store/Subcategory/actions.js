import { subcategoryActionTypes } from 'constants/actionTypeConstants';
import { modalActions,genericActions,snackActions,analyzeActions } from 'store/actions';
import * as status from 'constants/status';
import domains from 'constants/domains';

export const getAllSubcategories = () => {
  return async dispatch => {
    return dispatch(genericActions.getAll(domains.SUBCATEGORY));
  };
};

export const editSubcategoriesModal = () => {  
  return modalActions.openModal(subcategoryActionTypes.EDIT_SUBCATEGORIES_MODAL, null);
};

export const updateSubcategory = subcategory => {
  return async dispatch => {
    dispatch({ type: subcategoryActionTypes.UPDATE_SUBCATEGORY_REQUEST });
    try {
      await dispatch(genericActions.put(domains.SUBCATEGORY,subcategory));
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Subcategory Updated'));
      return dispatch({ type: subcategoryActionTypes.UPDATE_SUBCATEGORY_SUCCESS });      
    } catch (e) {
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Subcategory Update Failed'));
      return dispatch({ type: subcategoryActionTypes.UPDATE_SUBCATEGORY_FAILURE });
    }
  };
};

export const createSubcategory = subcategory => {
  return async dispatch => {
    dispatch({ type: subcategoryActionTypes.CREATE_SUBCATEGORY_REQUEST });
    try {
      await dispatch(genericActions.post(domains.SUBCATEGORY,subcategory));
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Subcategory Created'));
      return dispatch({ type: subcategoryActionTypes.CREATE_SUBCATEGORY_SUCCESS });      
    } catch (e) {
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Subcategory Creation Failed'));
      return dispatch({ type: subcategoryActionTypes.CREATE_SUBCATEGORY_FAILURE });
    }
  };
};
export const removeSubcategory = id => {
  return async dispatch => {
    dispatch({ type: subcategoryActionTypes.REMOVE_SUBCATEGORY_REQUEST });
    try {
      await dispatch(analyzeActions.deleteSelected(domains.SUBCATEGORY));
      await dispatch(genericActions.delet(domains.SUBCATEGORY,id));

      await dispatch(snackActions.openSnack(status.SUCCESS, 'Subcategory Deleted'));
      return dispatch({ type: subcategoryActionTypes.REMOVE_SUBCATEGORY_SUCCESS });      
    } catch (e) {
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Subcategory Deletion Failed'));
      return dispatch({ type: subcategoryActionTypes.REMOVE_SUBCATEGORY_FAILURE });
    }
  };
};