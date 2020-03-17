const sortOn$ = require('./sortOn$');

/**
 * Arranges values in an order.
 * @param {Array} x an array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array}
 */
function sortOn(x, fn=null, ths=null) {
  return sortOn$(x.slice(), fn, ths);
}
module.exports = sortOn;
