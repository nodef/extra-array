const id = require('./_id');

/**
 * Checks if array has a subsequence.
 * @param {Array} x an array
 * @param {Array} y subsequence?
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {boolean}
 */
function isSubsequenceOn(x, y, fn=null, ths=null) {
  var fn = fn||id, i = -1;
  var j = 0, J = y.length;
  var y1 = y.map(fn, ths);
  for(var u of x) {
    var u1 = fn.call(ths, u, ++i, x);
    if(u1===y1[j] && (++j)===J) return true;
  }
  return false;
}
module.exports = isSubsequenceOn;
