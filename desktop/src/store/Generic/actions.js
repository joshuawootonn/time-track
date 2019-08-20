import { normalize } from 'normalizr';
import * as endpoints from 'store/endpoints';
import * as schemas from 'store/schemas';

export const get = (domain, id) => {
  const get = endpoints[`${domain.singular}Endpoints`].default.get(id);
  return dispatch => {
    dispatch({ type: `get_${domain.singular}_request` });
    return get.then(
      response => {
        const payload = normalize(
          { [domain.plural]: [response.data] },
          schemas[`${domain.singular}Array`]
        );
        return dispatch({ type: `get_${domain.singular}_success`, payload });
      },
      e => {
        dispatch({ type: `get_${domain.singular}_failure`, e });
        return Promise.reject(e);
      }
    );
  };
};
export const getAll = domain => {
  const getAll = endpoints[`${domain.singular}Endpoints`].default.getAll();
  return dispatch => {
    dispatch({ type: `get_${domain.plural}_request` });
    return getAll.then(
      response => {
        const payload = normalize(
          { [domain.plural]: response.data },
          schemas[`${domain.singular}Array`]
        );
        return dispatch({
          type: `get_${domain.plural}_success`,
          payload,
          data: response.data
        });
      },
      e => {
        dispatch({ type: `get_${domain.plural}_failure`, e });
        return Promise.reject(e);
      }
    );
  };
};

export const put = (domain, object) => {
  const put = endpoints[`${domain.singular}Endpoints`].default.put(object);
  return async dispatch => {
    dispatch({ type: `put_${domain.singular}_request` });
    return put.then(
      response => {
        const payload = normalize(
          { [domain.plural]: [response.data] },
          schemas[`${domain.singular}Array`]
        );
        return dispatch({
          type: `put_${domain.singular}_success`,
          payload,
          data: response.data
        });
      },
      e => {
        dispatch({ type: `put_${domain.singular}_failure`, e });
        return Promise.reject(e);
      }
    );
  };
};
export const post = (domain, object) => {
  const post = endpoints[`${domain.singular}Endpoints`].default.post(object);
  return dispatch => {
    dispatch({ type: `post_${domain.singular}_request` });
    return post.then(
      response => {
        const payload = normalize(
          { [domain.plural]: [response.data] },
          schemas[`${domain.singular}Array`]
        );
        return dispatch({
          type: `post_${domain.singular}_success`,
          payload,
          data: response.data
        });
      },
      e => {
        dispatch({ type: `post_${domain.singular}_failure`, e });
        return Promise.reject(e);
      }
    );
  };
};
export const delet = (domain, id) => {
  const delet = endpoints[`${domain.singular}Endpoints`].default.delet(id);
  return dispatch => {
    dispatch({ type: `delete_${domain.singular}_request` });
    return delet.then(
      () => {
        const deleted = {
          entities: {
            [domain.plural]: [id]
          },
          result: {
            [domain.plural]: [id]
          }
        };
        return dispatch({ type: `delete_${domain.singular}_success`, deleted });
      },
      e => {
        dispatch({ type: `delete_${domain.singular}_failure`, e });
        return Promise.reject(e);
      }
    );
  };
};
