import { normalize } from 'normalizr';
import * as endpoints from 'store/endpoints';
import * as schemas from 'store/schemas';

export const get = domain => {
  return async dispatch => {    
    dispatch({ type: `get_${domain.singular}_request` });
    try {
      const response = await endpoints[`${domain.singular}Endpoints`].get();
      const payload = normalize({ [domain.plural]: [response.data] }, schemas[`${domain.singular}Array`]);
      return dispatch({ type: `get_${domain.singular}_success`, payload });
    } catch (e) {
      console.log(e);
      return dispatch({ type: `get_${domain.singular}_failure`,payload: e });
    }
  };
};
export const getAll = domain =>{
  return async dispatch => {    
    dispatch({ type: `get_${domain.plural}_request` });
    try {      
      const response = await endpoints[`${domain.singular}Endpoints`].default.getAll();
      const payload = normalize({ [domain.plural]: response.data }, schemas[`${domain.singular}Array`]);
      return dispatch({ type: `get_${domain.plural}_success`, payload });
    } catch (e) {
      console.log(e);
      return dispatch({ type: `get_${domain.plural}_failure`,payload: e });
    }
  };
};