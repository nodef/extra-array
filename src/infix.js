const random = require('./_random');

/**
 * Picks an arbitrary infix.
 * @param {Array} x an array
 * @param {number?} n number of values (-1 => any)
 * @param {number?} r random seed 0->1
 * @returns {Array}
 */
function infix(x, n=-1, r=Math.random()) {
  var X = x.length, rnd = random(r);
  var n = n>=0? n:Math.floor((X+1)*rnd());
  var i = Math.floor((X+1-n)*rnd());
  return n>X? null:x.slice(i, i+n);
}
module.exports = infix;
