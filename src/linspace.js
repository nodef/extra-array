const range = require('./range');

/**
 * Returns evenly spaced values withing given interval.
 * @param {number} v start of interval
 * @param {number} V end of interval
 * @param {number?} n no. of values in between (100)
 * @returns {Array} result
 */
function linspace(v, V, n=100) {
  var stp = (V-v)/(n-1);
  return range(v, V+stp, stp);
}
module.exports = linspace;
