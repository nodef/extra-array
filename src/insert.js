const insert$ = require('./insert$');

/**
 * Inserts a value to an ordered array.
 * @param {Array} x an array
 * @param {*} v value to insert
 * @param {function} fn compare function (a, b)
 */
function insert(x, v, fn) {
  return insert$(Array.from(x), v, fn);
}
module.exports = insert;
