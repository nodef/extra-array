const cmp = require('./_cmp');

/**
 * Gives values of an array not present in another.
 * @param {Array} x an array
 * @param {Array} y another array
 * @param {function?} fn compare function (a, b)
 * @returns {Array}
 */
function difference(x, y, fn=null) {
  var fn = fn||cmp, a = [];
  x: for(var u of x) {
    for(var v of y)
      if(fn(u, v)===0) continue x;
    a.push(u);
  }
  return a;
}
module.exports = difference;
