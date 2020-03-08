/**
 * Applies a function against accumulator, and each value in array
 * (from right-left) to reduce it to a single value.
 * @param {Array} x an array
 * @param {function} fn reduce fn (acc, val, idx, arr)
 * @param {*?} v inital value of accumulator | rightmost value in array
 * @returns {*} reduced value
 */
function foldr(x, fn, v) {
  return arguments.length>=3? x.reduceRight(fn, v):x.reduceRight(fn);
}
module.exports = foldr;
