/**
 * Gets true index to source (+ve).
 * @param {Array} x source
 * @param {number} i index (+ve, -ve)
 * @returns {number} +ve index
 */
function index(x, i) {
  return i<0? x.length-i:i;
}

/**
 * Gets value at index (+ve, -ve).
 * @param {Array} x source
 * @param {number} i index (-ve: from right)
 * @returns {*} value
 */
function get(x, i) {
  return x[index(x, i)];
}

/**
 * Sets value at index (+ve, -ve).
 * @param {Array} x source
 * @param {number} i index (-ve: from right)
 * @param {*} v value
 * @returns {Array} set array
 */
function set(x, i, v) {
  return splice(x, index(x, i), 1, v);
}

/**
 * Sets value at index (+ve, -ve)!
 * @param {Array} x target (modified!)
 * @param {number} i index (-ve: from right)
 * @param {*} v value
 * @returns {Array} target
 */
function set$(x, i, v) {
  x[index(x, i)] = v;
  return x;
}

/**
 * Gets first value.
 * @param {Array} x source
 * @returns {*} first value
 */
function head(x) {
  return x[0];
}

/**
 * Gets values except first.
 * @param {Array} x source
 * @returns {Array} except first
 */
function tail(x) {
  return x.slice(1);
}

/**
 * Gets values except last.
 * @param {Array} x source
 * @returns {Array} except last
 */
function init(x) {
  return x.slice(0, -1);
}

/**
 * Gets last value.
 * @param {Array} x source
 * @returns {*} last value
 */
function last(x) {
  return x[x.length-1];
}



/**
 * Lists all possible prefixes.
 * @param {Array} x source
 * @returns {Iterable<Array>} [prefix ...]
 */
function* prefixes(x) {
  for(var i=0, I=x.length; i<I; i++)
    yield x.slice(0, i);
}

/**
 * Lists all possible suffixes.
 * @param {Array} x source
 * @returns {Iterable<Array>} [suffix ...]
 */
function* suffixes(x) {
  for(var i=0, I=x.length; i<I; i++)
    yield x.slice(i);
}

/**
 * Lists all possible infixes.
 * @param {Array} x source
 * @returns {Iterable<Array>} [infix ...]
 */
function* infixes(x) {
  for(var i=0, I=x.length; i<I; i++) {
    for(var j=0; j<I; j++)
      yield x.slice(i, j);
  }
}

/**
 * Lists all possible partial sequences.
 * @param {Array} x source
 * @returns {Iterable<Array>} subsequence ...
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
 * @param {Array} x source
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
 * @param {Array} x source
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
 * Checks if array ends with a suffix.
 * @param {Array} x source
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
 * Checks if array contains an infix.
 * @param {Array} x source
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
 * Checks if array has a subsequence.
 * @param {Array} x source
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
 * @param {Array} x source
 * @param {Array} y permutation?
 * @returns {boolean} true if permutation
 */
function isPermutation(x, y) {
  var xa = x.slice.sort();
  var ya = y.slice.sort();
  return compare(xa, ya)===0;
}



/**
 * Places value between each element in source.
 * @param {Array} x source
 * @param {*} v value to place
 * @returns {Array} [x0 v x1 v ...]
 */
function intersperse(x, v) {
  var a = [];
  for(var w of x)
    a.push(w, v);
  a.pop();
  return a;
}

/**
 * Places separator between each array in source.
 * @param {Array<Array>} xs source arrays
 * @param {Array} y separator
 * @returns {Array} [x0 y x1 y ...]
 */
function intercalate(xs, y) {
  var a = [], Y = y.length;
  for(var x of xs)
    concat$(a, x, y);
  a.splice(a.length-Y, Y);
  return a;
}



/**
 * Applies a function against accumulator, and each value in array
 * (from left-right) to reduce it to a single value.
 * @param {Array} x array
 * @param {function} fn reduce fn (acc, val, idx, arr)
 * @param {*?} v inital value of accumulator | leftmost value in array
 * @returns {*} reduced value
 */
function foldl(x, fn, v) {
  return arguments.length>=3? x.reduce(fn, v):x.reduce(fn);
}

/**
 * Applies a function against accumulator, and each value in array
 * (from right-left) to reduce it to a single value.
 * @param {Array} x array
 * @param {function} fn reduce fn (acc, val, idx, arr)
 * @param {*?} v inital value of accumulator | rightmost value in array
 * @returns {*} reduced value
 */
function foldr(x, fn, v) {
  return arguments.length>=3? x.reduceRight(fn, v):x.reduceRight(fn);
}

/**
 * Applies a function against accumulator, and each value in array
 * (from left-right) to return successively reduced values.
 * @param {Array} x array
 * @param {function} fn reduce fn (acc, val, idx, arr)
 * @param {*?} v inital value of accumulator | leftmost value in array
 * @returns {Array} reduced values
 */
function scanl(x, fn, v) {
  var V = arguments.length>=3;
  var a = V? []:[head(x)];
  for(var i=V? 0:1, I=x.length; i<I; i++)
    a.push(v = fn(v, x[i], i, x));
  return a;
}

/**
 * Applies a function against accumulator, and each value in array
 * (from right-left) to return successively reduced values.
 * @param {Array} x array
 * @param {function} fn reduce fn (acc, val, idx, arr)
 * @param {*?} v inital value of accumulator | rightmost value in array
 * @returns {Array} reduced values
 */
function scanr(x, fn, v) {
  var V = arguments.length>=3;
  var a = V? []:[last(x)];
  for(var i=x.length-(V? 1:2); i>=0; i--)
    a.push(v = fn(v, x[i], i, x));
  return a;
}

/**
 * Builds list from a seed value (dual to foldr).
 * @param {function} fn unreduce fn (val, idx, arr)
 * @param {*} v initial value of accumucator
 */
function unfoldr(fn, v) {
  var a = [], i = -1;
  while(true) {
    var r = fn(v, ++i, a);
    if(!r) return a;
    var [w, v] = r;
    a.push(w);
  }
}



/**
 * Combines values from n arrays, with a function.
 * @param {Array<Array>} xs n arrays
 * @param {function} fn combine function (a, b, c, ...)
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
 * Sorts based on compare function (optional).
 * @param {Array} x source
 * @param {function?} fn compare function (a, b)
 * @returns {Array} sorted array
 */
function sort(x, fn) {
  return x.slice().sort(fn);
}

/**
 * Sorts based on map function (once per value).
 * @param {Array} x source
 * @param {function} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array} sorted array
 */
function sortOn(x, fn, ths=null) {
  return sortOn$(x.slice(), fn, ths);
}

/**
 * Sorts based on map function (once per value)!
 * @param {Array} x target (modified!)
 * @param {function} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array} target (sorted)
 */
function sortOn$(x, fn, ths=null) {
  var m = new Map(), i = -1;
  for(var v of x)
    m.set(v, fn.call(ths, v, ++i, x));
  return x.sort((a, b) => cmp(m.get(a), m.get(b)));
}

/**
 * Checks if two arrays are equal.
 * @param {Array} x array 1
 * @param {Array} y array 2
 * @param {function?} fn compare function (a, b)
 * @returns {boolean} true if equal
 */
function equals(x, y, fn) {
  return compare(x, y, fn)===0;
}

/**
 * Compares two arrays.
 * @param {Array} x array 1
 * @param {Array} y array 2
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
 * Append arrays to the end!
 * @param {Array} x target (modified!)
 * @param {...Array} ys arrays to append
 * @returns {Array} target (concatenated)
 */
function concat$(x, ...ys) {
  for(var y of ys)
    Array.prototype.push.apply(x, y);
  return x;
}

/**
 * Keeps the values which pass the test!
 * @param {Array} x target (modified!)
 * @param {function} fn filter function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array} target (filtered)
 */
function filter$(x, fn, ths=null) {
  for(var i=0, j=0, I=x.length; i<I; i++)
    if(fn.call(ths, x[i], i, x)) x[j++] = x[i];
  x.length = j;
  return x;
}

/**
 * Updates values based on map function!
 * @param {Array} x target (modified!)
 * @param {function} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array} target (mapped)
 */
function map$(x, fn, ths=null) {
  for(var i=0, I=x.length; i<I; i++)
    x[i] = fn.call(ths, x[i], i, x);
  return x;
}

/**
 * Keeps only the selected region!
 * @param {Array} x target (modified!)
 * @param {number} i start index
 * @param {number} I I index
 * @returns {Array} target (sliced)
 */
function slice$(x, i=0, I=x.length) {
  x.copyWithin(0, i, I);
  x.length = I-i;
  return x;
}

/**
 * Copies part of array within.
 * @param {Array} x source
 * @param {number} j write index
 * @param {number?} i read start index
 * @param {number?} I read I index
 * @returns {Array} updated array
 */
function copyWithin(x, j, i=0, I=x.length) {
  var a = x.slice(0, j);
  for(var J=j+I-i; j<J; j++, i++)
    a[j] = x[i];
  for(var J=x.length; j<J; j++)
    a[j] = x[j];
  return a;
}

/**
 * Removes last value.
 * @param {Array} x source
 * @returns {Array} popped
 */
function pop(x) {
  return x.slice(0, -1);
}

/**
 * Adds values to the end. 
 * @param {Array} x source
 * @param {...any} vs values to add
 * @returns {Array} pushed
 */
function push(x, ...vs) {
  return x.concat(vs);
}

/**
 * Reverses the values.
 * @param {Array} x source
 * @returns {Array} reversed
 */
function reverse(x) {
  return x.slice().reverse();
}

/**
 * Removes first value.
 * @param {Array} x source
 * @returns {Array} shifted
 */
function shift(x) {
  return x.slice(1);
}

/**
 * Adds values to the start.
 * @param {Array} x source
 * @param {...any} vs values to add
 * @returns {Array} unshifted
 */
function unshift(x, ...vs) {
  return concat$(vs, x);
}

/**
 * Removes or replaces existing values.
 * @param {Array} x source
 * @param {number} i remove index
 * @param {number?} n no. of values to remove (def: all till I)
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
 * Returns evenly spaced values within given interval.
 * @param {number} v start of interval
 * @param {number} V I of interval (excluding)
 * @param {number?} stp spacing between values (def: 1)
 * @returns {Array} result
 */
function arange(v, V, stp=1) {
  var a = [];
  for(; v<V; v+=stp)
    a.push(v);
  return a;
}

/**
 * Returns evenly spaced values withing given interval.
 * @param {number} v start of interval
 * @param {number} V I of interval
 * @param {number?} n no. of values in between (def: 100)
 * @returns {Array} result
 */
function linspace(v, V, n=100) {
  var stp = (V-v)/(n-1);
  return arange(v, V+stp, stp);
}



/**
 * Binary search value in sorted array.
 * @param {Array} x source (sorted)
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
 * Binary search closest value in sorted array.
 * @param {Array} x source (sorted)
 * @param {*} v value to find
 * @param {function?} fn compare function (a, b)
 * @returns {number} index of closest value
 */
function bsearchc(x, v, fn) {
  fn = fn||cmp;
  for(var i=0, I=x.length; i<I;) {
    var m = (i+I)>>>1;
    var c = fn.call(x[m], v);
    if(c<0) i = m+1;
    else if(c>0) I = m;
    else return m;
  }
  return i;
}

/**
 * Binary search first value in sorted array (left).
 * @param {Array} x source (sorted)
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
  return i>=x.length || x[i]!==v? ~i:i;
}

/**
 * Binary search last value in sorted array (right).
 * @param {Array} x source (sorted)
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
  return i<=0 || x[i-1]!==v? ~i:i-1;
}



/**
 * Removes duplicate elements.
 * @param {Array} x source
 * @param {function?} fn compare function (a, b)
 * @returns {Array} unique valued array
 */
function nub(x, fn) {
  if(!fn) return Array.from(new Set(x));
  var a = [];
  x: for(var v of x) {
    for(var w of a)
      if(fn(v, w)===0) continue x;
    a.push(v);
  }
  return a;
}

/**
 * Removes duplicate elements based of map function (once per value).
 * @param {Array} x source
 * @param {function} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array} unique valued array
 */
function nubOn(x, fn, ths=null) {
  var m = new Map(), i = -1;
  for(var v of x) {
    var w = fn.call(ths, v, ++i, x);
    if(!m.has(w)) m.set(w, v);
  }
  return Array.from(m.values());
}

function intersect(x, y, fn) {
  fn = fn||cmp;
  var a = [];
  x: for(var v of x) {
    for(var w of y)
      if(fn(v, w)===0) { a.push(v); continue x; }
  }
  return a;
}

function union$(x, y, fn) {
  fn = fn||cmp;
  y: for(var w of y) {
    for(var v of x)
      if(fn(v, w)===0) continue y;
    x.push(w);
  }
}

function union(x, y, fn) {
  return union$(x.slice(), y, fn);
}






function searchl(x, fn, ths=null) {
  for(var i=0, I=x.length; i<I; i++)
    if(fn.call(ths, x[i], i, x)===0) break;
  return i;
}

function searchr(x, fn, ths=null) {
  for(var i=x.length-1; i>=0; i--)
    if(fn.call(ths, x[i], i, x)===0) break;
  return i+1;
}

function skipl(x, fn, ths=null) {
  for(var i=0, I=x.length; i<I; i++)
    if(fn.call(ths, x[i], x)!==0) break;
  return i;
}

function skipr(x, fn, ths=null) {
  for(var i=x.length-1; i>=0; i--)
    if(fn.call(ths, x[i], i, x)!==0) break;
  return i+1;
}



/**
 * Splits source into values, which do / dont satisfy the filter.
 * @param {Array} x source
 * @param {function} fn filter function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array<Array>} [satisfies, doesnt]
 */
function partition(x, fn, ths=null) {
  var t = [], f = [], i = -1;
  for(var v of x) {
    if(fn.call(ths, v, ++i, x)) t.push(v);
    else f.push(v);
  }
  return [t, f];
}

/**
 * Breaks array wherever filter is true.
 * @param {Array} x source
 * @param {function} fn filter function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array<Array>} [piece ...]
 */
function cut(x, fn, ths=null) {
  var a = [], b = [], i = -1;
  for(var v of x) {
    if(!fn.call(ths, v, ++i, x)) b.push(v);
    else { a.push(b); b = []; }
  }
  if(b.length) a.push(b);
  return a;
}

/**
 * Breaks array considering filter as separator.
 * @param {Array} x source
 * @param {function} fn filter function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array<Array>} [piece ...]
 */
function split(x, fn, ths=null) {
  var a = [], b = [], i = -1;
  for(var v of x) {
    if(!fn.call(ths, v, ++i, x)) b.push(v);
    else if(b.length) { a.push(b); b = []; }
  }
  if(b.length) a.push(b);
  return a;
}
function cmp(a, b) {
  return a<b? -1:(a>b? 1:0);
}
function args() {
  return arguments;
}
