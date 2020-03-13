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
function cmp(a, b) {
  return a<b? -1:(a>b? 1:0);
}
/**
 * Binary searches value in sorted array.
 * @param {Array} x an array (sorted)
 * @param {*} v value to find
 * @param {function?} fn compare function (a, b)
 * @returns {number} index of value | ~(index of closest value)
 */
function bsearch(x, v, fn) {
  fn = fn||cmp;
  for(var i=0, I=x.length; i<I;) {
    var m = (i+I)>>>1;
    var c = fn(x[m], v);
    if(c<0) i = m+1;
    else if(c>0) I = m;
    else return m;
  }
  return ~i;
}
/**
 * Binary searches closest value in sorted array.
 * @param {Array} x an array (sorted)
 * @param {*} v value to find
 * @param {function?} fn compare function (a, b)
 * @returns {number} index of closest value
 */
function bsearchc(x, v, fn) {
  fn = fn||cmp;
  for(var i=0, I=x.length; i<I;) {
    var m = (i+I)>>>1;
    var c = fn(x[m], v);
    if(c<0) i = m+1;
    else if(c>0) I = m;
    else return m;
  }
  return i;
}
/**
 * Binary searches leftmost value in sorted array.
 * @param {Array} x an array (sorted)
 * @param {*} v value to find
 * @param {function?} fn compare function (a, b)
 * @returns {number} first index of value | ~(index of closest value)
 */
function bsearchl(x, v, fn) {
  fn = fn||cmp;
  for(var i=0, I=x.length; i<I;) {
    var m = (i+I)>>>1;
    var c = fn(x[m], v);
    if(c<0) i = m+1;
    else I = m;
  }
  return i>=x.length || fn(x[i], v)!==0? ~i:i;
}
/**
 * Binary searches rightmost value in sorted array.
 * @param {Array} x an array (sorted)
 * @param {*} v value to find
 * @param {function?} fn compare function (a, b)
 * @returns {number} last index of value | ~(index of closest value)
 */
function bsearchr(x, v, fn) {
  fn = fn||cmp;
  for(var i=0, I=x.length; i<I;) {
    var m = (i+I)>>>1;
    var c = fn(x[m], v);
    if(c<=0) i = m+1;
    else I = m;
  }
  return i<=0 || fn(x[i-1], v)!==0? ~i:i-1;
}
/**
 * Appends arrays to the end.
 * @param {Array} x an array (updated)
 * @param {...Iterable} ys arrays to append
 * @returns {Array} x
 */
function concat$(x, ...ys) {
  for(var y of ys) {
    if(Array.isArray(y)) Array.prototype.push.apply(x, y);
    else for(var v of y) x.push(v);
  }
  return x;
}
/**
 * Sorts based on map function (once per value).
 * @param {Array} x an array (updated)
 * @param {function} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array} x
 */
function sortOn$(x, fn, ths=null) {
  var m = new Map(), i = -1;
  for(var v of x)
    m.set(v, fn.call(ths, v, ++i, x));
  return x.sort((a, b) => cmp(m.get(a), m.get(b)));
}
/**
 * Sorts based on map function (once per value).
 * @param {Array} x an array
 * @param {function} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array} sorted array
 */
function sortOn(x, fn, ths=null) {
  return sortOn$(x.slice(), fn, ths);
}
/**
 * Sorts based on compare function (optional).
 * @param {Array} x an array
 * @param {function?} fn compare function (a, b)
 * @returns {Array} sorted array
 */
function sort(x, fn) {
  return x.slice().sort(fn);
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
exports.bsearch = bsearch;
exports.bsearchc = bsearchc;
exports.bsearchl = bsearchl;
exports.bsearchr = bsearchr;
exports.concat$ = concat$;
exports.sortOn$ = sortOn$;
exports.sortOn = sortOn;
exports.sort = sort;
