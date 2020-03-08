/**
 * Breaks array wherever filter is true.
 * @param {Array} x an array
 * @param {function} fn filter function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array<Array>} [piece ...]
 */
function cut(x, fn, ths=null) {
  var a = [], b = [], i = -1;
  for(var v of x) {
    if(!fn.call(ths, v, ++i, x)) b.push(v);
    else { a.push(b); b = []; }
  }
  if(b.length) a.push(b);
  return a;
}
module.exports = cut;
