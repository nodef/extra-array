const cmp = require('./_cmp');

/**
 * Searches a value from right.
 * @param {Array} x an array
 * @param {*} v search value
 * @param {function?} fn compare function (a, b)
 * @returns {number} index of value, -1 if not found
 */
function searchRight(x, v, fn=null) {
  var fn = fn||cmp;
  for(var i=x.length-1; i>=0; i--)
    if(fn(x[i], v)===0) return i;
  return -1;
}
module.exports = searchRight;
