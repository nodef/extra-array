const compare = require('./compare');
const cmp = require('./_cmp');

/**
 * Checks if array has a permutation.
 * @param {Array} x an array
 * @param {Array} y permutation?
 * @param {function?} fn compare function (a, b)
 * @returns {boolean}
 */
function isPermutation(x, y, fn=null) {
  var fn = fn||cmp;
  var x1 = x.slice().sort(fn);
  var y1 = y.slice().sort(fn);
  return compare(x1, y1, fn)===0;
}
module.exports = isPermutation;
