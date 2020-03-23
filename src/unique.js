const union$ = require('./union$');

/**
 * Removes duplicate values.
 * @param {Iterable} x an array
 * @param {function?} fn compare function (a, b)
 * @returns {Array}
 */
function unique(x, fn=null) {
  return union$([], x, fn);
}
module.exports = unique;
