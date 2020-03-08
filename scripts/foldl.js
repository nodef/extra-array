/**
 * Applies a function against accumulator, and each value in array
 * (from left-right) to reduce it to a single value.
 * @param {Array} x an array
 * @param {function} fn reduce fn (acc, val, idx, arr)
 * @param {*?} v inital value of accumulator | leftmost value in array
 * @returns {*} reduced value
 */
function foldl(x, fn, v) {
  return arguments.length>=3? x.reduce(fn, v):x.reduce(fn);
}
module.exports = foldl;
