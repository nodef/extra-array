/**
 * Removes duplicate elements based of map function (once per value).
 * @param {Array} x an array
 * @param {function} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array} unique valued array
 */
function nubOn(x, fn, ths=null) {
  var m = new Map(), i = -1;
  for(var v of x) {
    var w = fn.call(ths, v, ++i, x);
    if(!m.has(w)) m.set(w, v);
  }
  return Array.from(m.values());
}
module.exports = nubOn;
