import { authorityActionTypes } from 'constants/actionTypeConstants';
import { modalActions, genericActions, snackActions } from 'store/actions';
import domains from 'constants/domains';
import * as status from 'constants/status';

export const getAllAuthorities = () => {
  return async dispatch => {
    return dispatch(genericActions.getAll(domains.AUTHORITY));
  };
};

export const editAuthoritiesModal = () => {
  return modalActions.openModal(
    authorityActionTypes.EDIT_AUTHORITIES_MODAL,
    null
  );
};

export const updateAuthority = authority => {
  return async dispatch => {
    dispatch({ type: authorityActionTypes.UPDATE_AUTHORITY_REQUEST });
    try {
      await dispatch(genericActions.put(domains.AUTHORITY, authority));
      await dispatch(
        snackActions.openSnack(status.SUCCESS, `Authority Updated`)
      );
      return dispatch({ type: authorityActionTypes.UPDATE_AUTHORITY_SUCCESS });
    } catch (e) {
      await dispatch(
        snackActions.openSnack(status.SUCCESS, `Authority Update Failed`)
      );
      return dispatch({ type: authorityActionTypes.UPDATE_AUTHORITY_FAILURE });
    }
  };
};
