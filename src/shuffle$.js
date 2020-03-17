const mulberry32 = require('./_mulberry32');

/**
 * Rearranges values in arbitrary order.
 * @param {Array} x an array (updated)
 * @param {number?} n random seed
 * @returns {Array} x
 */
function shuffle$(x, n=Math.random()) {
  var rnd = mulberry32(Math.floor(n * 2**31));
  for(var i=0, I=x.length; i<I; i++) {
    var m = Math.floor(rnd() * I);
    var n = Math.floor(rnd() * I);
    var t = x[m];
    x[m] = x[n];
    x[n] = t;
  }
  return x;
}
module.exports = shuffle$;
