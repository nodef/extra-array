/**
 * Adds values to the end. 
 * @param {Array} x an array
 * @param {...any} vs values to add
 * @returns {Array} array
 */
function push(x, ...vs) {
  return x.concat(vs);
}
module.exports = push;
