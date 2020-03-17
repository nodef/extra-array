const cmp = require('./_cmp');

/**
 * Arranges values in an order.
 * @param {Array} x an array (updated)
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array} x
 */
function sortOn$(x, fn=null, ths=null) {
  if(!fn) return x.sort(cmp);
  var m = new Map(), i = -1;
  for(var v of x)
    m.set(v, fn.call(ths, v, ++i, x));
  return x.sort((a, b) => cmp(m.get(a), m.get(b)));
}
module.exports = sortOn$;
