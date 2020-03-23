/**
 * Breaks array after given indices.
 * @param {Array} x an array
 * @param {Iterable<number>} is split indices (sorted)
 * @returns {Array<Array>} [...pieces]
 */
function cutRight(x, is) {
  var a = [], i = 0;
  for(var j of is) {
    j = j<0? x.length:j;
    a.push(x.slice(i, j+1));
    i = j+1;
  }
  a.push(x.slice(j+1));
  return a;
}
module.exports = cutRight;
