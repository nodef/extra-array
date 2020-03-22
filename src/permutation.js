const permutation$ = require('./permutation$');

/**
 * Rearranges values in arbitrary order.
 * @param {Array} x an array
 * @param {number?} n number of values (-1 => any)
 * @param {number?} r random seed 0->1
 * @returns {Array}
 */
function permutation(x, n=-1, r=Math.random()) {
  if(n>x.length) return null;
  return permutation$(x.slice(), n, r);
}
module.exports = permutation;
