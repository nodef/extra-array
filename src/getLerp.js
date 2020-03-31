const get = require('./get');

/**
 * Gets value at fractional index.
 * @param {Array} x an array
 * @param {number} f fractional index 0->1
 * @returns {*}
 */
function getLerp(x, f) {
  var i = Math.floor(f * x.length);
  return get(x, i);
}
module.exports = getLerp;
