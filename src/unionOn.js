const unionOn$ = require('./unionOn$');

/**
 * Gives values present in any array.
 * @param {Array} x an array
 * @param {Iterable} y another array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array}
 */
function unionOn(x, y, fn=null, ths=null) {
  return unionOn$(x.slice(), y, fn, ths);
}
module.exports = unionOn;
