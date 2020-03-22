const random = require('./_random');

/**
 * Rearranges values in arbitrary order.
 * @param {Array} x an array (updated)
 * @param {number?} n number of values (-1 => any)
 * @param {number?} r random seed 0->1
 * @returns {Array} x
 */
function permutation$(x, n=-1, r=Math.random()) {
  if(n>x.length) return x;
  var X = x.length, rnd = random(r);
  var n = n>=0? n:Math.floor((X+1)*rnd());
  for(var i=0; i<n; i++) {
    var j = i+Math.floor((X-i)*rnd());
    var t = x[i]; x[i] = x[j]; x[j] = t;
  }
  x.length = n;
  return x;
}
module.exports = permutation$;
