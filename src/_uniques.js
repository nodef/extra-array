/**
 * Gets unique set of values.
 * @param {Iterable} x an iterable
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Set}
 */
function uniques(x, fn=null, ths=null) {
  if(!fn) return new Set(x);
  var s = new Set(), i = -1;
  for(var v of x)
    s.add(fn.call(ths, v, ++i, x));
  return s;
} 
module.exports = uniques;
