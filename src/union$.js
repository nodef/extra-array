const cmp = require('./_cmp');

/**
 * Gives union of first array with another.
 * @param {Array} x an array
 * @param {Array} y another array
 * @param {function?} fn compare function (a, b)
 * @returns {Array} x
 */
function union$(x, y, fn) {
  fn = fn||cmp;
  y: for(var v of y) {
    for(var u of x)
      if(fn(u, v)===0) continue y;
    x.push(v);
  }
  return x;
}
module.exports = union$;
