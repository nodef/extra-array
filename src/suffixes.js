/**
 * Lists all possible suffixes.
 * @param {Array} x an array
 * @returns {Iterable<Array>} ...suffixes
 */
function* suffixes(x) {
  for(var i=0, I=x.length; i<=I; i++)
    yield x.slice(i);
}
module.exports = suffixes;
