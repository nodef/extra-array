/**
 * Checks if array ends with a suffix.
 * @param {Array} x an array
 * @param {Array} y suffix?
 * @returns {boolean} true if suffix
 */
function isSuffix(x, y) {
  var i = x.length - y.length;
  for(var v of y)
    if(x[i]!==v) return false;
  return true;
}
module.exports = isSuffix;
