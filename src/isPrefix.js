/**
 * Checks if array starts with a prefix.
 * @param {Array} x an array
 * @param {Array} y prefix?
 * @returns {boolean} true if prefix
 */
function isPrefix(x, y) {
  var i = 0;
  for(var v of y)
    if(x[i]!==v) return false;
  return true;
}
module.exports = isPrefix;
