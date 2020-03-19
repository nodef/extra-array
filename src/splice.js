/**
 * Removes or replaces existing values.
 * @param {Array} x an array
 * @param {number} i remove index
 * @param {number?} n no. of values to remove
 * @param {...any} vs values to insert
 * @returns {Array<Array>} [[...removed], [...updated]]
 */
function splice(x, i, n=x.length-i, ...vs) {
  var a = x.slice(0, i);
  var r = x.slice(i, i+n);
  for(var v of vs)
    a.push(v);
  for(var i=i+n, I=x.length; i<I; i++)
    a.push(x[i]);
  return [r, a];
}
module.exports = splice;
