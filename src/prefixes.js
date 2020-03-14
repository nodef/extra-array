/**
 * Lists all possible prefixes.
 * @param {Array} x an array
 * @returns {Iterable<Array>} ...prefixes
 */
function* prefixes(x) {
  for(var i=0, I=x.length; i<=I; i++)
    yield x.slice(0, i);
}
module.exports = prefixes;
