/**
 * Lists all possible infixes.
 * @param {Array} x an array
 * @returns {Iterable<Array>} infix...
 */
function* infixes(x) {
  for(var i=0, I=x.length; i<I; i++) {
    for(var j=0; j<I; j++)
      yield x.slice(i, j);
  }
}
module.exports = infixes;
