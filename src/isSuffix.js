const cmp = require('./_cmp');

/**
 * Checks if array ends with a suffix.
 * @param {Array} x an array
 * @param {Array} y suffix?
 * @param {function?} fn compare function (a, b)
 * @returns {boolean}
 */
function isSuffix(x, y, fn=null) {
  var fn = fn||cmp, i = x.length-y.length-1;
  for(var v of y)
    if(fn(x[++i], v)!==0) return false;
  return true;
}
module.exports = isSuffix;
