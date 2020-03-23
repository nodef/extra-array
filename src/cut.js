/**
 * Breaks array at given indices.
 * @param {Array} x an array
 * @param {Iterable<number>} is split indices (sorted)
 * @returns {Array<Array>} [...pieces]
 */
function cut(x, is) {
  var a = [], i = 0;
  for(var j of is) {
    j = j<0? 0:j;
    a.push(x.slice(i, j));
    i = j;
  }
  a.push(x.slice(j));
  return a;
}
module.exports = cut;
