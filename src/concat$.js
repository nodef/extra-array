/**
 * Appends arrays to the end.
 * @param {Array} x an array (updated)
 * @param {...Array} ys arrays to append
 * @returns {Array} x
 */
function concat$(x, ...ys) {
  for(var y of ys)
    Array.prototype.push.apply(x, y);
  return x;
}
module.exports = concat$;
