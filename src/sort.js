const sort$ = require('./sort$');

/**
 * Arranges values in an order.
 * @param {Array} x an array
 * @param {function?} fc compare function (a, b)
 * @param {function?} fm map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array}
 */
function sort(x, fc=null, fm=null, ths=null) {
  return sort$(x.slice(), fc, fm, ths);
}
module.exports = sort;
