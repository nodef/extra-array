const cmp = require('./_cmp');

/**
 * Checks if array starts with a prefix.
 * @param {Array} x an array
 * @param {Array} y prefix?
 * @param {function?} fn compare function (a, b)
 * @returns {boolean}
 */
function isPrefix(x, y, fn=null) {
  var fn = fn||cmp, i = -1;
  for(var v of y)
    if(fn(x[++i], v)!==0) return false;
  return true;
}
module.exports = isPrefix;
