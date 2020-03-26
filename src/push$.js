/**
 * Adds values to the end. 
 * @param {Array} x an array (updated)
 * @param {...any} vs values to add
 * @returns {Array} x
 */
function push$(x, ...vs) {
  Array.prototype.push.apply(x, vs);
  return x;
}
module.exports = push$;
