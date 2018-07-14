import _ from 'lodash';
export default (state = {}, action) => {
  const { payload } = action;
  if (payload && payload.entities) {
    return _.merge({}, state, payload.entities);
  }
  return state;
};