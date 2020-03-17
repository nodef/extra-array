const shuffle$ = require('./shuffle$');

/**
 * Rearranges values in arbitrary order.
 * @param {Array} x an array
 * @param {number?} n random seed
 * @returns {Array}
 */
function shuffle(x, n=Math.random()) {
  return shuffle$(x.slice(), n);
}
module.exports = shuffle;
