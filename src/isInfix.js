const cmp = require('./_cmp');

/**
 * Checks if array contains an infix.
 * @param {Array} x an array
 * @param {Array} y infix?
 * @param {function?} fn compare function (a, b)
 * @returns {boolean} true if infix
 */
function isInfix(x, y, fn=null) {
  if(y.length===0) return true;
  var fn = fn||cmp;
  var Y = y.length, J = 0;
  var m = new Array(Y).fill(false);
  for(var u of x) {
    for(var j=J; j>0; j--)
      m[j] = m[j-1] && fn(u, y[j])===0;
    m[0] = fn(u, y[0])===0;
    J = Math.min(J+1, Y-1);
    if(m[Y-1]) return true;
  }
  return false;
}
module.exports = isInfix;
