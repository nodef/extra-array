/**
 * Lists all possible partial sequences.
 * @param {Array} x an array
 * @returns {Iterable<Array>} subsequence...
 */
function* subsequences(x) {
  if(x.length===0) { yield []; return; }
  var y = x.slice(0, -1);
  for(var s of subsequences(y))
    yield s;
  for(var s of subsequences(y)) {
    s.push(x[x.length-1]);
    yield s;
  }
}
module.exports = subsequences;
