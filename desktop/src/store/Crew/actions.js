import { crewActionTypes } from 'constants/actionTypeConstants';
import { modalActions,genericActions,snackActions } from 'store/actions';
import domains from 'constants/domains';
import * as status from 'constants/status';

export const getAllCrews = () => {
  return async dispatch => {
    dispatch(genericActions.getAll(domains.CREW));    
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
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Crew Updated'));
      return dispatch({ type: crewActionTypes.UPDATE_CREW_SUCCESS });      
    } catch (e) {
      console.log(e);
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Crew Update Failed'));
      return dispatch({ type: crewActionTypes.UPDATE_CREW_FAILURE });
    }
  };
};
