import { normalize } from 'normalizr';
import * as endpoints from 'store/endpoints';
import * as schemas from 'store/schemas';

export const get = (domain,id) => {
  return async dispatch => {    
    dispatch({ type: `get_${domain.singular}_request` });    
    const response = await endpoints[`${domain.singular}Endpoints`].default.get(id);
    const payload = normalize({ [domain.plural]: [response.data] }, schemas[`${domain.singular}Array`]);
    return dispatch({ type: `get_${domain.singular}_success`, payload });    
  };
};
export const getAll = domain =>{
  return async dispatch => {    
    dispatch({ type: `get_${domain.plural}_request` });       
    const response = await endpoints[`${domain.singular}Endpoints`].default.getAll();
    const payload = normalize({ [domain.plural]: response.data }, schemas[`${domain.singular}Array`]);
    return dispatch({ type: `get_${domain.plural}_success`, payload });    
  };
};
export const put = (domain,object) =>{
  return async dispatch => {    
    dispatch({ type: `put_${domain.singular}_request` });       
    const response = await endpoints[`${domain.singular}Endpoints`].default.put(object);
    const payload = normalize({ [domain.plural]: [response.data] }, schemas[`${domain.singular}Array`]);
    return dispatch({ type: `put_${domain.singular}_success`, payload });    
  };
};
export const post = (domain, object) => {
  console.log(domain,object);
  return async dispatch => {    
    dispatch({ type: `post_${domain.singular}_request` });       
    console.log(`${domain.singular}Endpoints`,endpoints[`${domain.singular}Endpoints`]);
    const response = await endpoints[`${domain.singular}Endpoints`].default.post(object);
    const payload = normalize({ [domain.plural]: [response.data] }, schemas[`${domain.singular}Array`]);
    return dispatch({ type: `post_${domain.singular}_success`, payload });   
  };
};
export const delet = (domain,id) => {
  return async dispatch => {    
    dispatch({ type: `delete_${domain.singular}_request` });    
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
  };
};