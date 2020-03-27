/**
 * Fills with given value.
 * @param {Array} x an array
 * @param {*} v value
 * @param {number?} i start index (0)
 * @param {number?} I end index (end)
 * @returns {Array}
 */
function fill(x, v, i=0, I=x.length) {
  return x.slice().fill(v, i, I);
}
module.exports = fill;
