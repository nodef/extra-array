const cmp = require('./_cmp');

/**
 * Searches a value throughout.
 * @param {Array} x an array
 * @param {*} v search value
 * @param {function?} fn compare function (a, b)
 * @returns {Array<number>} indices of value
 */
function searchAll(x, v, fn=null) {
  var fn = fn||cmp, a = [];
  for(var i=0, I=x.length; i<I; i++)
    if(fn(x[i], v)===0) a.push(i);
  return a;
}
module.exports = searchAll;
