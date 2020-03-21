const cmp = require('./_cmp');

/**
 * Counts occurrences of a value.
 * @param {Array} x an array
 * @param {*} v value
 * @param {function?} fn compare function (a, b)
 * @returns {number} occurrences
 */
function count(x, v, fcmp=null, fmap=null, ths=null) {
  var fcmp = fcmp||cmp, i = -1, n = 0;
  var fmap = fmap||id;
  var v1 = fn.call(ths, v, 0, null);
  for(var u of x) {
    var u1 = fn.call(ths, u, ++i, x);
    if(fcmp(u1, v1)===0) n++;
  }
  return n;
}
module.exports = count;
