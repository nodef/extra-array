const concat$ = require('./concat$')

/**
 * Gives values that cycle through an array.
 * @param {Array} x an array
 * @param {number} n number of values
 * @returns {Array}
 */
function cycle(x, n) {
  var a = [], X = x.length;
  if(X===0) return a;
  for(var i=0, I=Math.floor(n/X); i<I; i++)
    concat$(a, x);
  return concat$(a, x.slice(0, n % X));
}
module.exports = cycle;
