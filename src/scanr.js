/**
 * Applies a function against accumulator, and each value in array
 * (from right-left) to return successively reduced values.
 * @param {Array} x an array
 * @param {function} fn reduce fn (acc, val, idx, arr)
 * @param {*?} v inital value of accumulator | rightmost value in array
 * @returns {Array} reduced values
 */
function scanr(x, fn, v) {
  var V = arguments.length>=3;
  var a = V? []:[last(x)];
  for(var i=x.length-(V? 1:2); i>=0; i--)
    a.push(v = fn(v, x[i], i, x));
  return a;
}
module.exports = scanr;
