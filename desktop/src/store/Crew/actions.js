import { crewActionTypes } from 'constants/actionTypeConstants';
import { modalActions,genericActions,snackActions,analyzeActions } from 'store/actions';
import domains from 'constants/domains';
import * as status from 'constants/status';

export const getAllCrews = () => {
  return async dispatch => {
    return dispatch(genericActions.getAll(domains.CREW));    
  };
};

export const editCrewsModal = () => {
  return  modalActions.openModal(crewActionTypes.EDIT_CREWS_MODAL, null);
};

export const updateCrew = crew => {
  return async dispatch => {
    dispatch({ type: crewActionTypes.UPDATE_CREW_REQUEST });
    try {
      await dispatch(genericActions.put(domains.CREW,crew));
      await dispatch(snackActions.openSnack(status.SUCCESS, `Crew Updated`));
      return dispatch({ type: crewActionTypes.UPDATE_CREW_SUCCESS });      
    } catch (e) {
      await dispatch(snackActions.openSnack(status.SUCCESS, `Crew Update Failed`));
      return dispatch({ type: crewActionTypes.UPDATE_CREW_FAILURE });
    }
  };
};

export const createCrew = crew => {
  return async dispatch => {
    dispatch({ type: crewActionTypes.CREATE_CREW_REQUEST });
    try {
      await dispatch(genericActions.post(domains.CREW,crew));
      await dispatch(snackActions.openSnack(status.SUCCESS, `Crew Created`));
      return dispatch({ type: crewActionTypes.CREATE_CREW_SUCCESS });      
    } catch (e) {
      await dispatch(snackActions.openSnack(status.SUCCESS, `Crew Creation Failed`));
      return dispatch({ type: crewActionTypes.CREATE_CREW_FAILURE });
    }
  };
};

export const removeCrew = id => {
  return async dispatch => {
    dispatch({ type: crewActionTypes.REMOVE_CREW_REQUEST });
    try {
      await dispatch(analyzeActions.deleteSelected(domains.CREW));
      await dispatch(genericActions.delet(domains.CREW,id));

      await dispatch(snackActions.openSnack(status.SUCCESS, `Crew Deleted`));
      return dispatch({ type: crewActionTypes.REMOVE_CREW_SUCCESS });      
    } catch (e) {
      await dispatch(snackActions.openSnack(status.SUCCESS, `Crew Deletion Failed`));
      return dispatch({ type: crewActionTypes.REMOVE_CREW_FAILURE });
    }
  };
};