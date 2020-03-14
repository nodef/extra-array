const splice = require('./splice');

/**
 * Lists all possible arrangements.
 * @param {Array} x an array
 * @returns {Iterable<Array>} ...permutations
 */
function* permutations(x) {
  if(x.length===0) { yield []; return; }
  for(var i=x.length-1; i>=0; i--) {
    var y = splice(x, i, 1);
    for(var p of permutations(y)) {
      p.push(x[i]);
      yield p;
    }
  }
}
module.exports = permutations;
