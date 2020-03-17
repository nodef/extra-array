const compareOn = require('./compareOn');

/**
 * Checks if two arrays are equal.
 * @param {Array} x an array
 * @param {Array} y another array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {boolean} true if equal
 */
function isEqualOn(x, y, fn=null, ths=null) {
  return compareOn(x, y, fn, ths)===0;
}
module.exports = isEqualOn;
