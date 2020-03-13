/**
 * Removes duplicate elements.
 * @param {Array} x source
 * @param {function?} fn compare function (a, b)
 * @returns {Array} unique valued array
 */
function nub(x, fn) {
  if(!fn) return Array.from(new Set(x));
  var a = [];
  x: for(var v of x) {
    for(var w of a)
      if(fn(v, w)===0) continue x;
    a.push(v);
  }
  return a;
}
module.exports = nub;
