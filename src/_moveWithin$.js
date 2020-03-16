const length = require('./_length');

// TODO
// this can be a derivative of swap block
/**
 * Moves part of array within.
 * @param {Array} x an array
 * @param {number} j insert index
 * @param {number?} i delete start index
 * @param {number?} I delete end index (x.length)
 * @returns {Array} x
 */
function moveWithin$(x, j, i, I=x.length) {
  var y = x.splice(i, length(x, i, I));
  x.splice(j, 0, ...y);
  return x;
}
module.exports = moveWithin$;
