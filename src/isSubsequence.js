const cmp = require('./_cmp');

/**
 * Checks if array has a subsequence.
 * @param {Array} x an array
 * @param {Array} y subsequence?
 * @param {function?} fn compare function (a, b)
 * @returns {boolean}
 */
function isSubsequence(x, y, fn=null) {
  if(y.length===0) return true;
  var fn = fn||cmp;
  var j = 0, J = y.length;
  for(var u of x)
    if(fn(u, y[j])===0 && (++j)===J) return true;
  return false;
}
module.exports = isSubsequence;
