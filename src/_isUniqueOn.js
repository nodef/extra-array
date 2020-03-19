const id = require('./_id');

/**
 * Checks if there are no duplicate values.
 * @param {Array} x an array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {boolean}
 */
function isUniqueOn(x, fn=null, ths=null) {
  var fn = fn||id;
  for(var i=0, I=x.length; i<I; i++) {
    var u = fn.call(ths, x[i], i, x);
    for(var j=0; j<i; j++) {
      var v = fn.call(ths, x[j], j, x);
      if(u===v) return false;
    }
  }
  return true;
}
module.exports = isUniqueOn;
