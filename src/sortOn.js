const sortOn$ = require('./sortOn$');

/**
 * Sorts based on map function (once per value).
 * @param {Array} x an array
 * @param {function} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array} sorted array
 */
function sortOn(x, fn, ths=null) {
  return sortOn$(x.slice(), fn, ths);
}
module.exports = sortOn;
