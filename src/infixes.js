/**
 * Lists all possible infixes.
 * @param {Array} x an array
 * @param {number} n number of values (-1 => any)
 * @returns {Iterable<Array>} ...infixes
 */
function* infixes(x, n=-1) {
  if(n<=0) { yield []; if(n===0) return; }
  var X = x.length, N = Math.max(n, 1), dj = n<0? 1:X;
  for(var i=0, I=X-N+1; i<I; i++) {
    for(var j=i+N; j<=X; j+=dj)
      yield x.slice(i, j);
  }
}
module.exports = infixes;
