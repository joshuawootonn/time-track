import { normalize } from 'normalizr';
import * as endpoints from 'store/endpoints';
import * as schemas from 'store/schemas';

export const get = (domain,id) => {
  return async dispatch => {    
    dispatch({ type: `get_${domain.singular}_request` });
    try {
      const response = await endpoints[`${domain.singular}Endpoints`].default.get(id);
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
export const put = (domain,object) =>{
  return async dispatch => {    
    dispatch({ type: `put_${domain.singular}_request` });
    try {      
      const response = await endpoints[`${domain.singular}Endpoints`].default.put(object);
      const payload = normalize({ [domain.plural]: [response.data] }, schemas[`${domain.singular}Array`]);
      return dispatch({ type: `put_${domain.singular}_success`, payload });
    } catch (e) {
      console.log(e);
      return dispatch({ type: `put_${domain.singular}_failure`,payload: e });
    }
  };
};
export const post = (domain, object) => {
  return async dispatch => {    
    dispatch({ type: `post_${domain.singular}_request` });
    try {      
      const response = await endpoints[`${domain.singular}Endpoints`].default.post(object);
      const payload = normalize({ [domain.plural]: [response.data] }, schemas[`${domain.singular}Array`]);
      return dispatch({ type: `post_${domain.singular}_success`, payload });
    } catch (e) {
      console.log(e);
      return dispatch({ type: `post_${domain.singular}_failure`,payload: e });
    }
  };
};
export const delet = (domain,id) => {
  return async dispatch => {    
    dispatch({ type: `delete_${domain.singular}_request` });
    try {
      await endpoints[`${domain.singular}Endpoints`].default.delet(id);
      const deleted ={
        entities: {
          [domain.plural] : [id]
        },
        result: {
          [domain.plural] : [id]
        }
      };
      return dispatch({ type: `delete_${domain.singular}_success`, deleted });
    } catch (e) {
      console.log(e);
      return dispatch({ type: `delete_${domain.singular}_failure`,payload: e });
    }
  };
};