const cmp = require('./_cmp');

/**
 * Gives values present in both arrays.
 * @param {Iterable} x an array
 * @param {Iterable} y another array
 * @param {function?} fn compare function (a, b)
 * @returns {Array}
 */
function intersection(x, y, fn=null) {
  var fn = fn||cmp, a = [];
  x: for(var u of x) {
    for(var v of y)
      if(fn(u, v)===0) { a.push(u); continue x; }
  }
  return a;
}
module.exports = intersection;
