/**
 * Inserts a value to an ordered array.
 * @param {Array} x an array (updated)
 * @param {*} v value to insert
 * @param {function} fn compare function (a, b)
 */
function insert$(x, v, fn) {
  var i = x.findIndex(f => fn(f, v)>0);
  x.splice(i>=0? i:x.length, 0, v);
  return x;
}
module.exports = insert$;
