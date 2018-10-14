import _ from 'lodash';

function payloadCustomizer(objValue, srcValue) {
  // console.log(objValue,srcValue)
  if (_.isArray(objValue)) {
    return arrayUnique(objValue.concat(srcValue));
  }
}

function arrayUnique(array) {
  let a = array.concat();
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }
  return a;
}


export default (state = {}, action) => {
  const { payload, deleted } = action;
  
  if (payload && payload.result) {
    return _.mergeWith({}, state, payload.result, payloadCustomizer);
  } else if (deleted && deleted.result) {
    //console.log(state.employees);
    let temp = {};
    Object.keys(state).forEach((result) => {      
      temp[result] = _.difference(state[result],deleted.result[result])
    })
    //console.log(temp.employees);
    return temp;
  }
  return state;
};
