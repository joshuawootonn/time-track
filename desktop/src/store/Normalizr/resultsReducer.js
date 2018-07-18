import _ from 'lodash';

function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return arrayUnique(objValue.concat(srcValue));
  }
}

function arrayUnique(array) {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }

  return a;
}

export default (state = {}, action) => {
  const { payload } = action;
  if (payload && payload.result) {
    return _.mergeWith({}, state, payload.result, customizer);
  }
  return state;
};
