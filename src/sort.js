const cmp = require('./_cmp');

/**
 * Sorts based on compare function (optional).
 * @param {Array} x an array
 * @param {function?} fn compare function (a, b)
 * @returns {Array} sorted array
 */
function sort(x, fn) {
  return x.slice().sort(fn||cmp);
}
module.exports = sort;
