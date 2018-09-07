import { exportActionTypes } from 'constants/ActionTypes';




export const exportToExcel = (exportBy, from, type, length) => {
  return async dispatch => {
    dispatch({ type: exportActionTypes.EXPORT_EXCEL_REQUEST });
    try {
    

      await dispatch(
        snackActions.openSnack(status.SUCCESS, 'Export Success!'),
      );
      return dispatch({ type: exportActionTypes.EXPORT_EXCEL_SUCCESS });
    } catch (e) {
      console.log(e);
      dispatch(snackActions.openSnack(status.FAILURE, 'Export failed!'));
      return dispatch({
        type: exportActionTypes.EXPORT_EXCEL_FAILURE,
        payload: e,
      });
      throw e;
    }
  };
}; 