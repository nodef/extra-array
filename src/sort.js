const sort$ = require('./sort$');

/**
 * Arranges values in an order.
 * @param {Array} x an array
 * @param {function?} fc compare function (a, b)
 * @returns {Array}
 */
function sort(x, fn=null) {
  return sort$(x.slice(), fn);
}
module.exports = sort;
