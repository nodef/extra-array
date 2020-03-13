/**
 * Returns evenly spaced values within given interval.
 * @param {number} v start of interval
 * @param {number} V end of interval (excluding)
 * @param {number?} stp spacing between values (1)
 * @returns {Array} result
 */
function range(v, V, stp=1) {
  var a = [];
  for(; v<V; v+=stp)
    a.push(v);
  return a;
}
module.exports = range;
