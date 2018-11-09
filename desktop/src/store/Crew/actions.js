import { crewActionTypes } from 'constants/actionTypeConstants';
import { modalActions } from 'store/actions';

import * as endpoint from './endpoints';
import { normalize } from 'normalizr';
import * as schemas from 'store/schemas';

export const getCrews = () => {
  return async dispatch => {
    dispatch({ type: crewActionTypes.GET_CREWS_REQUEST });
    try {
      const response = await endpoint.getCrews();
      const payload = normalize({ crews: response.data }, schemas.crewArray);
      //console.log('sadf',{ crews: response.data },response.data,payload);
      return dispatch({
        type: crewActionTypes.GET_CREWS_SUCCESS,
        payload
      });
    } catch (e) {
      dispatch({
        type: crewActionTypes.GET_CREWS_FAILURE,
        payload: e
      });
    }
  };
};

export const editCrewsModal = () => {
  return  modalActions.openModal(crewActionTypes.EDIT_CREWS_MODAL, null);
};

export const putCrew = crew => {
  return async dispatch => {
    dispatch({ type: crewActionTypes.PUT_CREW_REQUEST });
    try {    
      const response = await endpoint.putCrew(crew.id, crew);
      const payload = normalize(
        { crews: [response.data] },
        schemas.crewArray,
      );
      return dispatch({ type: crewActionTypes.PUT_CREW_SUCCESS, payload });
    } catch (e) {
      console.log(e);
      return dispatch({ type: crewActionTypes.PUT_CREW_FAILURE, payload: e });
    }
  };
};