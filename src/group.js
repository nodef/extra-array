const cmp = require('./_cmp');

/**
 * Keeps similar values together and in order.
 * @param {Iterable} x an array
 * @param {function?} fn compare function (a, b)
 * @returns {Array<Array>}
 */
function group(x, fn=null) {
  var fn = fn||cmp;
  var u = x[0], a = [], b = [];
  for(var v of x) {
    if(fn(u, v)===0) b.push(v);
    else { a.push(b); b = [v]; }
    u = v;
  }
  a.push(b);
  return a;
}
module.exports = group;
