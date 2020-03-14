/**
 * Gets true index to array (+ve).
 * @param {Array} x an array
 * @param {number} i index (+ve, -ve)
 * @returns {number} +ve index
 */
function index(x, i) {
  return i<0? x.length+i:i;
}
/**
 * Gets value at index (+ve, -ve).
 * @param {Array} x an array
 * @param {number} i index (-ve: from right)
 * @returns {*} value
 */
function get(x, i) {
  return x[index(x, i)];
}
/**
 * Removes or replaces existing values.
 * @param {Array} x an array
 * @param {number} i remove index
 * @param {number?} n no. of values to remove
 * @param {...any} vs values to insert
 * @returns {Array} [0->i, vs, i+n->I]
 */
function splice(x, i, n=x.length-i, ...vs) {
  var a = x.slice(0, i);
  for(var v of vs)
    a.push(v);
  for(var i=i+n, I=x.length; i<I; i++)
    a.push(x[i]);
  return a;
}
/**
 * Sets value at index (+ve, -ve).
 * @param {Array} x an array
 * @param {number} i index (-ve: from right)
 * @param {*} v value
 * @returns {Array} set array
 */
function set(x, i, v) {
  return splice(x, index(x, i), 1, v);
}
function cmp(a, b) {
  return a<b? -1:(a>b? 1:0);
}
/**
 * Compares two arrays.
 * @param {Array} x an array
 * @param {Array} y another array
 * @param {function?} fn compare function (a, b)
 * @returns {number} x<y: -1, x=y: 0, x>y: 1
 */
function compare(x, y, fn) {
  fn = fn||cmp;
  var n = x.length - y.length;
  if(n!==0) return n<0? -1:1;
  for(var i=0, I=x.length; i<I; i++) {
    var c = fn(x[i], y[i]);
    if(c!==0) return c;
  }
  return 0;
}
/**
 * Updates values based on map function.
 * @param {Array} x an array (updated)
 * @param {function} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array} x
 */
function map$(x, fn, ths=null) {
  for(var i=0, I=x.length; i<I; i++)
    x[i] = fn.call(ths, x[i], i, x);
  return x;
}
/**
 * Keeps the values which pass the test.
 * @param {Array} x an array (updated)
 * @param {function} fn filter function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array} x
 */
function filter$(x, fn, ths=null) {
  for(var i=0, j=0, I=x.length; i<I; i++)
    if(fn.call(ths, x[i], i, x)) x[j++] = x[i];
  x.length = j;
  return x;
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
 * Splits array into chunks of given size.
 * @param {Array} x an array
 * @param {number?} n chunk size
 * @returns {Array<Array>} chunks
 */
function chunk(x, n=1) {
  var a = [];
  for(var i=0, I=x.length; i<I; i+=n)
    a.push(x.slice(i, i+n));
  return a;
}
function args(...vs) {
  return vs;
}
/**
 * Combines values from n arrays, with a function.
 * @param {Array<Array>} xs n arrays
 * @param {function?} fn combine function (a, b, c, ...)
 * @param {object?} ths this argument
 * @returns {Array<Array>} combined values
 */
function zip(xs, fn, ths=null) {
  fn = fn||args;
  var a = [], A = 0;
  for(var r=0, R=xs.length; r<R; r++)
    A = Math.max(A, xs[r].length);
  for(var c=0; c<A; c++) {
    for(var r=0, w=[]; r<R; r++)
      w[r] = xs[r][c];
    a[c] = fn.apply(ths, w);
  }
  return a;
}
/**
 * Inserts a value to an ordered array.
 * @param {Array} x an array (updated)
 * @param {*} v value to insert
 * @param {function?} fn compare function (a, b)
 * @returns {Array} x
 */
function insert$(x, v, fn) {
  fn = fn||cmp;
  var i = x.findIndex(f => fn(f, v)>0);
  x.splice(i>=0? i:x.length, 0, v);
  return x;
}
/**
 * Inserts a value to an ordered array.
 * @param {Iterable} x an array
 * @param {*} v value to insert
 * @param {function?} fn compare function (a, b)
 */
function insert(x, v, fn) {
  return insert$(Array.from(x), v, fn);
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
 * Sorts based on map function (once per value).
 * @param {Array} x an array (updated)
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array} x
 */
function sortOn$(x, fn, ths=null) {
  if(!fn) return x.sort((a, b) => cmp(a, b)); 
  var m = new Map(), i = -1;
  for(var v of x)
    m.set(v, fn.call(ths, v, ++i, x));
  return x.sort((a, b) => cmp(m.get(a), m.get(b)));
}
/**
 * Sorts based on map function (once per value).
 * @param {Array} x an array
 * @param {function?} fn map function (v, i, x)
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
  return x.slice().sort(fn||cmp);
}
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
  var xa = x.slice().sort();
  var ya = y.slice().sort();
  return compare(xa, ya)===0;
}
exports.get = get;
exports.set = set;
exports.compare = compare;

exports.map$ = map$;
exports.filter$ = filter$;
exports.concat$ = concat$;
exports.chunk = chunk;
exports.zip = zip;

exports.splice = splice;
exports.insert$ = insert$;
exports.insert = insert;

exports.bsearch = bsearch;
exports.bsearchc = bsearchc;
exports.bsearchl = bsearchl;
exports.bsearchr = bsearchr;
exports.sortOn$ = sortOn$;
exports.sortOn = sortOn;
exports.sort = sort;

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
