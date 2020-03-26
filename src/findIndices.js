/**
 * Finds indices of values passing the test.
 * @param {Iterable} x an array
 * @param {function} fn test function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array<number>}
 */
function findIndices(x, fn, ths=null) {
  var a = [], i = -1;
  for(var v of x)
    if(fn.call(ths, v, ++i, x)) a.push(i);
  return a;
}
module.exports = findIndices;
