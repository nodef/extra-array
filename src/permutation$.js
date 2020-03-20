const mulberry32 = require('./_mulberry32');

/**
 * Rearranges values in arbitrary order.
 * @param {Array} x an array (updated)
 * @param {number?} n number of values (-1 => any)
 * @param {number?} r random seed 0->1
 * @returns {Array} x
 */
function permutation$(x, n=x.length, r=Math.random()) {
  var rnd = mulberry32(r), X = x.length;
  for(var i=0, I=n-1; i<I; i++) {
    var j = i+Math.floor((X-i)*rnd());
    var t = x[i]; x[i] = x[j]; x[j] = t;
  }
  x.length = n;
  return x;
}
module.exports = permutation$;
