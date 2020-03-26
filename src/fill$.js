/**
 * Fills with given value.
 * @param {Array} x an array (updated)
 * @param {*} v value
 * @param {number?} i start index (0)
 * @param {number?} I end index (end)
 * @returns {Array} x
 */
function fill$(x, v, i=0, I=x.length) {
  return x.fill(v, i, I);
}
module.exports = fill$;
