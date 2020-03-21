const unionBy$ = require('./unionBy$');

/**
 * Removes duplicate values.
 * @param {Array} x an array
 * @param {function?} fn compare function (a, b)
 * @returns {Array}
 */
function uniqueBy(x, fn=null) {
  return unionBy$([], x, fn);
}
module.exports = uniqueBy;
