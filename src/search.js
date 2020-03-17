var cmp = require('./_cmp');

/**
 * Searches a value from left.
 * @param {Array} x an array
 * @param {*} v search value
 * @param {function?} fn compare function (a, b)
 * @returns {number} index of value, -1 if not found
 */
function search(x, v, fn=null) {
  var fn = fn||cmp;
  for(var i=0, I=x.length; i<I; i++)
    if(fn(x[i], v)===0) return i;
  return -1;
}
module.exports = search;
