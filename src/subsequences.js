/**
 * Lists all possible subsequences.
 * @param {Array} x an array
 * @param {number?} n number of values (-1 => any)
 * @returns {Iterable<Array>} ...subsequences
 */
function* subsequences(x, n=-1) {
  var X = x.length;
  if(n>=X) { if(n===X) yield x; return; }
  if(n===0 || X===0) { yield []; return; }
  var y = x.slice(0, -1);
  yield* subsequences(y, n);
  for(var s of subsequences(y, n-1)) {
    s.push(x[X-1]);
    yield s;
  }
}
module.exports = subsequences;
