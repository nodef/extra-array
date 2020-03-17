const concat$ = require('./concat$');

/**
 * Repeats an array given times.
 * @param {Array} x an array
 * @param {number} n times
 * @returns {Array}
 */
function repeat(x, n) {
  for(var a=[];n>0; n--)
    concat$(a, x);
  return a;
}
module.exports = repeat;
