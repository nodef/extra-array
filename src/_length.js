const region = require('./_region');

/**
 * Gets length within array.
 * @param {Array} x an array
 * @param {number} i start index (+ve/-ve)
 * @param {number} I end index (+ve/-ve)
 */
function length(x, i, I) {
  var [i, I] = region(x, i, I);
  return I-i;
}
module.exports = length;
