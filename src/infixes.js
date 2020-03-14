/**
 * Lists all possible infixes.
 * @param {Array} x an array
 * @returns {Iterable<Array>} ...infixes
 */
function* infixes(x) {
  yield [];
  for(var i=0, I=x.length; i<I; i++) {
    for(var j=i+1; j<=I; j++)
      yield x.slice(i, j);
  }
}
module.exports = infixes;
