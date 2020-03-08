/**
 * Applies a function against accumulator, and each value in array
 * (from left-right) to return successively reduced values.
 * @param {Array} x an array
 * @param {function} fn reduce fn (acc, val, idx, arr)
 * @param {*?} v inital value of accumulator | leftmost value in array
 * @returns {Array} reduced values
 */
function scanl(x, fn, v) {
  var V = arguments.length>=3;
  var a = V? []:[head(x)];
  for(var i=V? 0:1, I=x.length; i<I; i++)
    a.push(v = fn(v, x[i], i, x));
  return a;
}
module.exports = scanl;
