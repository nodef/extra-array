const cmp = require('./_cmp');

/**
 * Inserts a value to an ordered array.
 * @param {Array} x an array (updated)
 * @param {*} v value to insert
 * @param {function?} fn compare function (a, b)
 * @returns {Array} x
 */
function insert$(x, v, fn) {
  fn = fn||cmp;
  var i = x.findIndex(f => fn(f, v)>0);
  x.splice(i>=0? i:x.length, 0, v);
  return x;
}
module.exports = insert$;
