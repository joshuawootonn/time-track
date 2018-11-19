import { normalize } from 'normalizr';

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const generateCRUDActions = (
  singular,
  plural,
  normalizrSchema,
  endpoint
) => {
  return {
    [`get${capitalize(singular)}`]: async dispatch => {
      dispatch({ type: `get_${singular}_request` });
      try {
        const response = await endpoint.get();
        const payload = normalize({ [plural]: [response.data] }, normalizrSchema);
        return dispatch({ type: `get_${singular}_success`, payload });
      } catch (e) {
        console.log(e);
        return dispatch({ type: `get_${singular}_failure`,payload: e });
      }
    },[`getAll${capitalize(plural)}`]: async dispatch => {
      dispatch({ type: `get_${plural}_request` });
      try {
        const response = await endpoint.getAll();
        const payload = normalize({ [plural]: response.data }, normalizrSchema);
        return dispatch({ type: `get_${plural}_success`, payload });
      } catch (e) {
        console.log(e);
        return dispatch({ type: `get_${plural}_failure`,payload: e });
      }
    }
  };
};
