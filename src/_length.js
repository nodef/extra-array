const region = require('./_region');

/**
 * Gets length of a part of array.
 * @param {Array} x an array
 * @param {number} i start index +ve/-ve (0)
 * @param {number} I end index +ve/-ve (end)
 */
function length(x, i=0, I=x.length) {
  var [i, I] = region(x, i, I);
  return I-i;
}
module.exports = length;
