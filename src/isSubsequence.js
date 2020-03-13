/**
 * Checks if array has a subsequence.
 * @param {Array} x an array
 * @param {Array} y subsequence?
 * @returns {boolean} true if subsequence
 */
function isSubsequence(x, y) {
  var i = 0, I = y.length;
  for(var v of x)
    if(v===y[i]) i++;
  return i===I;
}
module.exports = isSubsequence;
