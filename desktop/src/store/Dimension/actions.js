import { genericActions } from 'store/actions';
import domains from 'constants/domains';

export const getAllDimensions = () => {
  return async dispatch => {
    return dispatch(genericActions.getAll(domains.DIMENSION));
  };
};
