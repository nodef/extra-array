const union$ = require('./union$');

/**
 * Gives union of an array with another.
 * @param {Array} x an array
 * @param {Array} y another array
 * @param {function?} fc compare function (a, b)
 * @param {function?} fm map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array}
 */
function union(x, y, fc=null, fm=null, ths=null) {
  return union$(x.slice(), y, fc, fm, ths);
}
module.exports = union;
