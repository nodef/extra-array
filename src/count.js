const cmp = require('./_cmp');

/**
 * Counts occurrences of a value.
 * @param {Iterable} x an array
 * @param {*} v value
 * @param {function?} fn compare function (a, b)
 * @returns {number}
 */
function count(x, v, fn=null) {
  var fn = fn||cmp, n = 0;
  for(var u of x)
    if(fn(u, v)===0) n++;
  return n;
}
module.exports = count;
