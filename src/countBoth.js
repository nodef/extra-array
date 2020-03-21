const cmp = require('./_cmp');

/**
 * Counts occurrences of a value.
 * @param {Array} x an array
 * @param {*} v value
 * @param {function?} fn compare function (a, b)
 * @returns {number} occurrences
 */
function count(x, v, fn=null, fm=null, ths=null) {
  if(fm) return countOn(x, v, fm, ths);
  var fn = fn||cmp, n = 0;
  for(var u of x)
    if(fn(u, v)===0) n++;
  return n;
}
function countOn(x, v, fn=null, ths=null) {
  var i = -1, n = 0;
  var v1 = fn.call(ths, v, 0, null);
  for(var u of x) {
    var u1 = fn.call(ths, u, ++i, x);
    if(u1===v1) n++;
  }
  return n;
}
module.exports = count;

var x = [1, 2, 3, -2];
count(x, 2, (a, b) => Math.abs(a)-Math.abs(b));
countOn(x, 2, v => Math.abs(v));

count(x, 2, null, v => Math.abs(v));
