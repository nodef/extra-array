/**
 * Lists all possible suffixes.
 * @param {Array} x source
 * @returns {Iterable<Array>} suffix...
 */
function* suffixes(x) {
  for(var i=0, I=x.length; i<I; i++)
    yield x.slice(i);
}
module.exports = suffixes;
