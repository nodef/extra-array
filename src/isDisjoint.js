const cmp = require('./_cmp');

/**
 * Checks if arrays have no value in common.
 * @param {Iterable} x an array
 * @param {Iterable} y another array
 * @param {function?} fn compare function (a, b)
 * @returns {boolean} true if disjoint
 */
function isDisjoint(x, y, fn=null) {
  var fn = fn||cmp;
  for(var v of y) {
    for(var u of x)
      if(fn(u, v)===0) return false;
  }
  return true;
}
module.exports = isDisjoint;
