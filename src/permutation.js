const permutation$ = require('./permutation$');

/**
 * Rearranges values in arbitrary order.
 * @param {Array} x an array
 * @param {number?} n number of values (-1 => any)
 * @param {number?} r random seed 0->1
 * @returns {Array}
 */
function permutation(x, n=x.length, r=Math.random()) {
  return permutation$(x.slice(), n, r);
}
module.exports = permutation;
