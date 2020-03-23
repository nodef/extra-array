const id = require('./_id');

/**
 * Counts occurrences of values.
 * @param {Iterable} x an array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Map<any, number>}
 */
function countAllOn(x, fn=null, ths=null) {
  var fn = fn||id;
  var m = new Map(), i = -1;
  for(var v of x) {
    var v1 = fn.call(ths, v, i, x);
    m.set((m.get(v1)||0) + 1);
  }
  return m;
}
module.exports = countAllOn;
