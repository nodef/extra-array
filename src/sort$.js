const cmp = require('./_cmp');

/**
 * Arranges values in an order.
 * @param {Array} x an array (updated)
 * @param {function?} fn compare function (a, b)
 * @returns {Array} x
 */
function sort$(x, fn=null) {
  return x.sort(fn||cmp);
}
module.exports = sort$;
