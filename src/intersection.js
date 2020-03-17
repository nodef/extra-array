const cmp = require('./_cmp');

/**
 * Gives values of an array present in another.
 * @param {Array} x an array
 * @param {Array} y another array
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
