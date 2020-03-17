const union$ = require('./union$');

/**
 * Removes duplicate elements.
 * @param {Array} x an array
 * @param {function?} fn compare function (a, b)
 * @returns {Array} unique values
 */
function unique(x, fn=null) {
  return union$([], x, fn);
}
module.exports = unique;
