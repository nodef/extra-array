const cmp = require('./_cmp');

/**
 * Arranges values in an order.
 * @param {Array} x an array
 * @param {function?} fn compare function (a, b)
 * @returns {Array} sorted array
 */
function sort(x, fn=null) {
  var fn = fn||cmp;
  return x.slice().sort(fn);
}
module.exports = sort;
