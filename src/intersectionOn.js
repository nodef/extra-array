const uniques = require('./_uniques');
const id = require('./_id');

/**
 * Gives values of an array present in another.
 * @param {Iterable} x an array
 * @param {Iterable} y another array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array}
 */
function intersectionOn(x, y, fn=null, ths=null) {
  var s = uniques(y, fn, ths);
  var fn = fn||id, i = -1, a = [];
  for(var u of x) {
    var u1 = fn.call(ths, u, ++i, x);
    if(s.has(u1)) a.push(u);
  }
  return a;
}
module.exports = intersectionOn;
