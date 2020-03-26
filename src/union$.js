const cmp = require('./_cmp');

/**
 * Gives values present in any array.
 * @param {Array} x an array (updated)
 * @param {Iterable} y another array
 * @param {function?} fn compare function (a, b)
 * @returns {Array} x
 */
function union$(x, y, fn=null) {
  var fn = fn||cmp;
  y: for(var v of y) {
    for(var u of x)
      if(fn(u, v)===0) continue y;
    x.push(v);
  }
  return x;
}
module.exports = union$;
