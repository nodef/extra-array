const cmp = require('./_cmp');

/**
 * Checks if there are no duplicate values.
 * @param {Array} x an array
 * @param {function?} fn compare function (a, b)
 * @returns {boolean}
 */
function isUnique(x, fn=null) {
  var fn = fn||cmp;
  for(var i=0, I=x.length; i<I; i++) {
    for(var j=0; j<i; j++)
      if(fn(x[i], x[j])===0) return false;
  }
  return true;
}
module.exports = isUnique;
