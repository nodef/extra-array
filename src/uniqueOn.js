const unionOn$ = require('./unionOn$');

/**
 * Removes duplicate elements.
 * @param {Array} x an array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array} unique values
 */
function uniqueOn(x, fn=null, ths=null) {
  if(!fn) return Array.from(new Set(x));
  return unionOn$([], x, fn, ths);
}
module.exports = uniqueOn;
