const get = require('./get');

/**
 * Gets value at indices (+ve, -ve).
 * @param {Array} x an array
 * @param {number} is indices (-ve: from right)
 * @returns {*} [...values]
 */
function getAll(x, is) {
  var a = [];
  for(var i of is)
    a.push(get(x, i));
  return a;
}
module.exports = getAll;
