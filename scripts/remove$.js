/**
 * Deletes first occurrence of a value.
 * @param {Array} x an array (updated)
 * @param {*} v value to delete
 * @param {function} fn compare function (a, b)
 */
function remove$(x, v, fn) {
  var i = x.findIndex(f => fn(v, f)===0);
  if(i>=0) x.splice(i, 1);
  return x;
}
module.exports = remove$;
