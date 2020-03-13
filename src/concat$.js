/**
 * Appends arrays to the end.
 * @param {Array} x an array (updated)
 * @param {...Iterable} ys arrays to append
 * @returns {Array} x
 */
function concat$(x, ...ys) {
  for(var y of ys) {
    if(Array.isArray(y)) Array.prototype.push.apply(x, y);
    else for(var v of y) x.push(v);
  }
  return x;
}
module.exports = concat$;
