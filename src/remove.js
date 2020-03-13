const remove$ = require('./remove$');

/**
 * Deletes first occurrence of a value.
 * @param {Array} x an array
 * @param {*} v value to delete
 * @param {function} fn compare function (a, b)
 */
function remove(x, v, fn) {
  return remove$(Array.from(x), v, fn);
}
module.exports = remove;
