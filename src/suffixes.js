/**
 * Lists all possible suffixes.
 * @param {Array} x an array
 * @param {number} n number of values (-1 => any)
 * @returns {Iterable<Array>} ...suffixes
 */
function* suffixes(x, n=-1) {
  if(n>=0) { yield x.slice(x.length-n); return; }
  for(var i=0, I=x.length; i<=I; i++)
    yield x.slice(i);
}
module.exports = suffixes;
