/**
 * Lists all possible prefixes.
 * @param {Array} x an array
 * @param {number?} n number of values (-1 => any)
 * @returns {Iterable<Array>} ...prefixes
 */
function* prefixes(x, n=-1) {
  if(n>=0) { yield x.slice(0, n); return; }
  for(var i=0, I=x.length; i<=I; i++)
    yield x.slice(0, i);
}
module.exports = prefixes;
