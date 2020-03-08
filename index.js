/**
 * Lists all possible prefixes.
 * @param {Array} x an array
 * @returns {Iterable<Array>} prefix...
 */
function* prefixes(x) {
  for(var i=0, I=x.length; i<I; i++)
    yield x.slice(0, i);
}
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
/**
 * Lists all possible suffixes.
 * @param {Array} x an array
 * @returns {Iterable<Array>} suffix...
 */
function* suffixes(x) {
  for(var i=0, I=x.length; i<I; i++)
    yield x.slice(i);
}
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
/**
 * Lists all possible arrangements.
 * @param {Array} x an array
 * @returns {Iterable<Array>} permutation ...
 */
function* permutations(x) {
  if(x.length===0) { yield []; return; }
  for(var i=x.length-1; i>=0; i--) {
    var y = splice(x, i);
    for(var p of permutations(y)) {
      p.push(x[i]);
      yield p;
    }
  }
}
/**
 * Checks if array starts with a prefix.
 * @param {Array} x an array
 * @param {Array} y prefix?
 * @returns {boolean} true if prefix
 */
function isPrefix(x, y) {
  var i = 0;
  for(var v of y)
    if(x[i]!==v) return false;
  return true;
}
/**
 * Checks if array contains an infix.
 * @param {Array} x an array
 * @param {Array} y infix?
 * @returns {boolean} true if infix
 */
function isInfix(x, y) {
  var i = 0, I = y.length;
  for(var v of x) {
    if(v===y[i]) i++;
    else if(i<I) i = 0;
  }
  return i===I;
}
/**
 * Checks if array ends with a suffix.
 * @param {Array} x an array
 * @param {Array} y suffix?
 * @returns {boolean} true if suffix
 */
function isSuffix(x, y) {
  var i = x.length - y.length;
  for(var v of y)
    if(x[i]!==v) return false;
  return true;
}
/**
 * Checks if array has a subsequence.
 * @param {Array} x an array
 * @param {Array} y subsequence?
 * @returns {boolean} true if subsequence
 */
function isSubsequence(x, y) {
  var i = 0, I = y.length;
  for(var v of x)
    if(v===y[i]) i++;
  return i===I;
}
/**
 * Checks if array has a permutation.
 * @param {Array} x an array
 * @param {Array} y permutation?
 * @returns {boolean} true if permutation
 */
function isPermutation(x, y) {
  var xa = x.slice.sort();
  var ya = y.slice.sort();
  return compare(xa, ya)===0;
}
exports.prefixes = prefixes;
exports.infixes = infixes;
exports.suffixes = suffixes;
exports.subsequences = subsequences;
exports.permutations = permutations;
exports.isPrefix = isPrefix;
exports.isInfix = isInfix;
exports.isSuffix = isSuffix;
exports.isSubsequence = isSubsequence;
exports.isPermutation = isPermutation;
