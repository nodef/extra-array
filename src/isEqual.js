const compare = require('./compare');

/**
 * Checks if two arrays are equal.
 * @param {Array} x an array
 * @param {Array} y another array
 * @param {function?} fn compare function (a, b)
 * @returns {boolean} true if equal
 */
function isEqual(x, y, fn) {
  return compare(x, y, fn)===0;
}
module.exports = isEqual;
