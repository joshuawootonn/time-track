import merge from 'lodash/merge';

export default (state = {}, action) => {
  const { payload } = action;
  if (payload && payload.entities) {
    return merge({}, state, payload.entities);
  }
  return state;
};