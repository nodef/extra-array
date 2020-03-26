const random = require('./_random');

/**
 * Picks an arbitrary suffix.
 * @param {Array} x an array
 * @param {number?} n number of values (-1 => any)
 * @param {number?} r random seed 0->1
 * @returns {Array}
 */
function suffix(x, n=-1, r=Math.random()) {
  var X = x.length, rnd = random(r);
  var n = n>=0? n:Math.floor((X+1)*rnd());
  return n>X? null:x.slice(-n);
}
module.exports = suffix;
