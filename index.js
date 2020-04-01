/**
 * Compares two values.
 * @param {*} a a value
 * @param {*} b another value
 * @returns {number} a<b: -1, a=b: 0, a>b: 1
 */
function cmp(a, b) {
  return a<b? -1:(a>b? 1:0);
}
/**
 * Binary searches value in sorted array.
 * @param {Array} x an array (sorted)
 * @param {*} v search value
 * @param {function?} fn compare function (a, b)
 * @returns {number} index of value | ~(index of closest value)
 */
function bsearchAny(x, v, fn=null) {
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
 * @param {*} v search value
 * @param {function?} fn compare function (a, b)
 * @returns {number} index of closest value
 */
function bsearchClosest(x, v, fn=null) {
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
 * @param {*} v search value
 * @param {function?} fn compare function (a, b)
 * @returns {number} first index of value | ~(index of closest value)
 */
function bsearch(x, v, fn=null) {
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
 * @param {*} v search value
 * @param {function?} fn compare function (a, b)
 * @returns {number} last index of value | ~(index of closest value)
 */
function bsearchRight(x, v, fn=null) {
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
 * Breaks array into chunks of given size.
 * @param {Array} x an array
 * @param {number?} n chunk size (1)
 * @returns {Array<Array>} chunks
 */
function chunk(x, n=1) {
  var a = [];
  for(var i=0, I=x.length; i<I; i+=n)
    a.push(x.slice(i, i+n));
  return a;
}

/**
 * Compares two arrays.
 * @param {Array} x an array
 * @param {Array} y another array
 * @param {function?} fn compare function (a, b)
 * @returns {number} x<y: -1, x=y: 0, x>y: 1
 */
function compare(x, y, fn=null) {
  var fn = fn||cmp;
  var n = x.length - y.length;
  if(n!==0) return n<0? -1:1;
  for(var i=0, I=x.length; i<I; i++) {
    var c = fn(x[i], y[i]);
    if(c!==0) return c;
  }
  return 0;
}
/**
 * Appends arrays to the end.
 * @param {Array} x an array
 * @param {...Iterable} ys arrays to append
 * @returns {Array}
 */
function concat(x, ...ys) {
  return x.concat(...ys);
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
 * Gets zero-based index.
 * @param {Array} x an array
 * @param {number} i index (-ve: from right)
 * @returns {number}
 */
function index(x, i) {
  return i<0? Math.max(x.length+i, 0) : Math.min(i, x.length);
}
/**
 * Gets index range of part of array.
 * @param {Array} x an array
 * @param {number?} i start index (-ve: from right) (0)
 * @param {number?} I end index (-ve: from right) (end)
 * @returns {number} [start index, end index]
 */
function indexRange(x, i=0, I=x.length) {
  i = index(x, i);
  I = Math.max(i, index(x, I));
  return [i, I];
}
/**
 * Copies part of array to another.
 * @param {Array} x target array (updated)
 * @param {Array} y source array
 * @param {number?} j write index (0)
 * @param {number?} i read start index (0)
 * @param {number?} I read end index (end)
 * @returns {Array} x
 */
function copy$(x, y, j=0, i=0, I=y.length) {
  var j = index(x, j);
  var [i, I] = indexRange(y, i, I);
  for(; i<I; i++, j++)
    x[j] = y[i];
  return x;
}
/**
 * Copies part of array to another.
 * @param {Array} x target array
 * @param {Array} y source array
 * @param {number?} j write index (0)
 * @param {number?} i read start index (0)
 * @param {number?} I read end index (end)
 * @returns {Array}
 */
function copy(x, y, j=0, i=0, I=y.length) {
  return copy$(x.slice(), y, j, i, I);
}
/**
 * Counts values which satisfy a test.
 * @param {Iterable} x an array
 * @param {function} fn test function (v, i, x)
 * @param {object?} ths this argument
 * @returns {number}
 */
function count(x, fn, ths=null) {
  var n = 0, i = -1;
  for(var v of x)
    if(fn.call(ths, v, ++i, x)) n++;
  return n;
}
/**
 * Gives same value.
 * @param {*} v a value
 * @returns {*} v
 */
function id(v) {
  return v;
}
/**
 * Counts occurrences of values.
 * @param {Iterable} x an array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Map<any, number>} Map {value => count}
 */
function countOn(x, fn=null, ths=null) {
  var fn = fn||id;
  var m = new Map(), i = -1;
  for(var v of x) {
    var v1 = fn.call(ths, v, ++i, x);
    m.set(v1, (m.get(v1)||0) + 1);
  }
  return m;
}
/**
 * Breaks array at given indices.
 * @param {Array} x an array
 * @param {Iterable<number>} is split indices (sorted)
 * @returns {Array<Array>} [...pieces]
 */
function cut(x, is) {
  var a = [], i = 0;
  for(var j of is) {
    j = j<0? 0:j;
    a.push(x.slice(i, j));
    i = j;
  }
  a.push(x.slice(j));
  return a;
}
/**
 * Breaks array after given indices.
 * @param {Array} x an array
 * @param {Iterable<number>} is split indices (sorted)
 * @returns {Array<Array>} [...pieces]
 */
function cutRight(x, is) {
  var a = [], i = 0;
  for(var j of is) {
    j = j<0? x.length:j;
    a.push(x.slice(i, j+1));
    i = j+1;
  }
  a.push(x.slice(j+1));
  return a;
}
/**
 * Gives values that cycle through an array.
 * @param {Array} x an array
 * @param {number} n number of values
 * @returns {Array}
 */
function cycle(x, n) {
  var a = [], X = x.length;
  if(X===0) return a;
  for(var i=0, I=Math.floor(n/X); i<I; i++)
    concat$(a, x);
  return concat$(a, x.slice(0, n % X));
}
/**
 * Gives values of an array not present in another.
 * @param {Iterable} x an array
 * @param {Iterable} y another array
 * @param {function?} fn compare function (a, b)
 * @returns {Array}
 */
function difference(x, y, fn=null) {
  var fn = fn||cmp, a = [];
  x: for(var u of x) {
    for(var v of y)
      if(fn(u, v)===0) continue x;
    a.push(u);
  }
  return a;
}
/**
 * Gets unique set of values.
 * @param {Iterable} x an iterable
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Set}
 */
function uniques(x, fn=null, ths=null) {
  if(!fn) return new Set(x);
  var s = new Set(), i = -1;
  for(var v of x)
    s.add(fn.call(ths, v, ++i, x));
  return s;
}
/**
 * Gives values of an array not present in another.
 * @param {Iterable} x an array
 * @param {Iterable} y another array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array}
 */
function differenceOn(x, y, fn=null, ths=null) {
  var s = uniques(y, fn, ths);
  var fn = fn||id, i = -1, a = [];
  for(var u of x) {
    var u1 = fn.call(ths, u, ++i, x);
    if(!s.has(u1)) a.push(u);
  }
  return a;
}
/**
 * Fills with given value.
 * @param {Array} x an array
 * @param {*} v value
 * @param {number?} i start index (0)
 * @param {number?} I end index (end)
 * @returns {Array}
 */
function fill(x, v, i=0, I=x.length) {
  return x.slice().fill(v, i, I);
}
/**
 * Fills with given value.
 * @param {Array} x an array (updated)
 * @param {*} v value
 * @param {number?} i start index (0)
 * @param {number?} I end index (end)
 * @returns {Array} x
 */
function fill$(x, v, i=0, I=x.length) {
  return x.fill(v, i, I);
}
/**
 * Keeps values which pass a test.
 * @param {Array} x an array
 * @param {function} fn test function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array}
 */
function filter(x, fn, ths=null) {
  return x.filter(fn, ths);
}
/**
 * Keeps values which pass a test.
 * @param {Array} x an array (updated)
 * @param {function} fn test function (v, i, x)
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
 * Finds leftmost value passing the test.
 * @param {Array} x an array
 * @param {function} fn test function (v, i, x)
 * @param {object?} ths this argument
 * @returns {*}
 */
function find(x, fn, ths=null) {
  return x.find(fn, ths);
}
/**
 * Finds index of leftmost value passing the test.
 * @param {Array} x an array
 * @param {function} fn test function (v, i, x)
 * @param {object?} ths this argument
 * @returns {number} index of value, -1 if not found
 */
function findIndex(x, fn, ths=null) {
  return x.findIndex(fn, ths);
}
/**
 * Finds indices of values passing the test.
 * @param {Iterable} x an array
 * @param {function} fn test function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array<number>}
 */
function findIndices(x, fn, ths=null) {
  var a = [], i = -1;
  for(var v of x)
    if(fn.call(ths, v, ++i, x)) a.push(i);
  return a;
}
/**
 * Finds rightmost value passing the test.
 * @param {Array} x an array
 * @param {function} fn test function (v, i, x)
 * @param {object?} ths this argument
 * @returns {*}
 */
function findRight(x, fn, ths=null) {
  for(var i=x.length-1; i>=0; i--)
    if(fn.call(ths, x[i], i, x)) return x[i];
}
function flatTo(a, x, dep) {
  for(var v of x) {
    if(dep!==0 && Array.isArray(v)) flatTo(a, v, dep-1);
    else a.push(v);
  }
  return a;
}

/**
 * Flattens nested array to given depth.
 * @param {Iterable} x a nested array
 * @param {number?} dep maximum depth (-1)
 * @returns {Array}
 */
function flat(x, dep=-1) {
  return flatTo([], x, dep);
}
/**
 * Gets value at index.
 * @param {Array} x an array
 * @param {number} i index (-ve: from right)
 * @returns {*}
 */
function get(x, i) {
  return x[index(x, i)];
}
/**
 * Gets values at indices.
 * @param {Array} x an array
 * @param {Iterable<number>} is indices (-ve: from right)
 * @returns {Array}
 */
function getAll(x, is) {
  var a = [];
  for(var i of is)
    a.push(get(x, i));
  return a;
}
/**
 * Gets value at fractional index.
 * @param {Array} x an array
 * @param {number} f fractional index 0->1
 * @returns {*}
 */
function getLerp(x, f) {
  var i = Math.floor(f * x.length);
  return get(x, i);
}
/**
 * Breaks array keeping similar values together.
 * @param {Iterable} x an array
 * @param {function?} fn compare function (a, b)
 * @returns {Array<Array>}
 */
function group(x, fn=null) {
  var fn = fn||cmp;
  var u = x[0], a = [], b = [];
  for(var v of x) {
    if(fn(u, v)===0) b.push(v);
    else { a.push(b); b = [v]; }
    u = v;
  }
  a.push(b);
  return a;
}
/**
 * Breaks array keeping similar values together.
 * @param {Iterable} x an array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array<Array>}
 */
function groupOn(x, fn=null, ths=null) {
  var fn = fn||id;
  var a = [], b = [], i = -1;
  var u1 = fn.call(ths, x[0], 0, x);
  for(var v of x) {
    var v1 = fn.call(ths, v, ++i, x);
    if(u1===v1) b.push(v);
    else { a.push(b); b = [v]; }
    u1 = v1;
  }
  a.push(b);
  return a;
}
/**
 * Lists all possible infixes.
 * @param {Array} x an array
 * @param {number?} n number of values (-1 => any)
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
/**
 * Gives a random number generator.
 * @param {number} r random seed 0->1
 * @returns {function}
 */
function random(r) {
  var a = Math.floor(r * (2 ** 31));
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}
/**
 * Picks an arbitrary infix.
 * @param {Array} x an array
 * @param {number?} n number of values (-1 => any)
 * @param {number?} r random seed 0->1
 * @returns {Array}
 */
function infix(x, n=-1, r=Math.random()) {
  var X = x.length, rnd = random(r);
  var n = n>=0? n:Math.floor((X+1)*rnd());
  var i = Math.floor((X+1-n)*rnd());
  return n>X? null:x.slice(i, i+n);
}
/**
 * Places values of an array between another.
 * @param {Array} x an array
 * @param {Array} y another array
 * @param {number?} m number of values from x (1)
 * @param {number?} n number of values from y (1)
 * @returns {Array}
 */
function interleave(x, y, m=1, n=1) {
  var X = x.length, Y = y.length;
  var i = 0, j = 0, a = [];
  if(X===0) return y.slice();
  if(Y===0) return x.slice();
  if(X>=Y) while(true) {
    for(var k=0; k<m && i<X; k++, i++)
      a.push(x[i]);
    if(i===X) break;
    for(var k=0; k<n; k++, j=(j+1)%Y)
      a.push(y[j]);
  }
  else while(true) {
    for(var k=0; k<m; k++, i=(i+1)%X)
      a.push(x[i]);
    if(j===Y) break;
    for(var k=0; k<n && j<Y; k++, j++)
      a.push(y[j]);
  }
  return a;
}
/**
 * Gives values present in both arrays.
 * @param {Iterable} x an array
 * @param {Iterable} y another array
 * @param {function?} fn compare function (a, b)
 * @returns {Array}
 */
function intersection(x, y, fn=null) {
  var fn = fn||cmp, a = [];
  x: for(var u of x) {
    for(var v of y)
      if(fn(u, v)===0) { a.push(u); continue x; }
  }
  return a;
}
/**
 * Gives values present in both arrays.
 * @param {Iterable} x an array
 * @param {Iterable} y another array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array}
 */
function intersectionOn(x, y, fn=null, ths=null) {
  var s = uniques(y, fn, ths);
  var fn = fn||id, i = -1, a = [];
  for(var u of x) {
    var u1 = fn.call(ths, u, ++i, x);
    if(s.has(u1)) a.push(u);
  }
  return a;
}
/**
 * Checks if arrays have no value in common.
 * @param {Iterable} x an array
 * @param {Iterable} y another array
 * @param {function?} fn compare function (a, b)
 * @returns {boolean}
 */
function isDisjoint(x, y, fn=null) {
  var fn = fn||cmp;
  for(var v of y) {
    for(var u of x)
      if(fn(u, v)===0) return false;
  }
  return true;
}
/**
 * Checks if arrays have no value in common.
 * @param {Iterable} x an array
 * @param {Iterable} y another array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {boolean}
 */
function isDisjointOn(x, y, fn=null, ths=null) {
  var s = uniques(x, fn, ths);
  var fn = fn||id, i = -1;
  for(var v of y) {
    var v1 = fn.call(ths, v, ++i, y);
    if(s.has(v1)) return false;
  }
  return true;
}
/**
 * Checks if two arrays are equal.
 * @param {Array} x an array
 * @param {Array} y another array
 * @param {function?} fn compare function (a, b)
 * @returns {boolean} true if equal
 */
function isEqual(x, y, fn=null) {
  return compare(x, y, fn)===0;
}
/**
 * Checks if array contains an infix.
 * @param {Iterable} x an array
 * @param {Array} y infix?
 * @param {function?} fn compare function (a, b)
 * @returns {boolean}
 */
function isInfix(x, y, fn=null) {
  if(y.length===0) return true;
  var fn = fn||cmp;
  var Y = y.length, J = 0;
  var m = new Array(Y).fill(false);
  for(var u of x) {
    for(var j=J; j>0; j--)
      m[j] = m[j-1] && fn(u, y[j])===0;
    m[0] = fn(u, y[0])===0;
    J = Math.min(J+1, Y-1);
    if(m[Y-1]) return true;
  }
  return false;
}
/**
 * Checks if array contains an infix.
 * @param {Iterable} x an array
 * @param {Array} y infix?
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {boolean}
 */
function isInfixOn(x, y, fn=null, ths=null) {
  if(y.length===0) return true;
  var fn = fn||id;
  var Y = y.length, i = -1, J = 0;
  var y1 = y.map(fn, ths);
  var m = new Array(Y).fill(false);
  for(var u of x) {
    var u1 = fn.call(ths, u, ++i, x);
    for(var j=J; j>0; j--)
      m[j] = m[j-1] && u1===y1[j];
    m[0] = u1===y1[0];
    J = Math.min(J+1, Y-1);
    if(m[Y-1]) return true;
  }
  return false;
}
const exports47 = Array.isArray;
/**
 * Checks if array has a subsequence.
 * @param {Iterable} x an array
 * @param {Array} y subsequence?
 * @param {function?} fn compare function (a, b)
 * @returns {boolean}
 */
function isSubsequence(x, y, fn=null) {
  if(y.length===0) return true;
  var fn = fn||cmp;
  var j = 0, J = y.length;
  for(var u of x)
    if(fn(u, y[j])===0 && (++j)===J) return true;
  return false;
}
/**
 * Checks if array has a permutation.
 * @param {Array} x an array
 * @param {Array} y permutation?
 * @param {function?} fn compare function (a, b)
 * @returns {boolean}
 */
function isPermutation(x, y, fn=null) {
  var fn = fn||cmp;
  var x1 = x.slice().sort(fn);
  var y1 = y.slice().sort(fn);
  return isSubsequence(x1, y1, fn);
}
/**
 * Checks if array has a permutation.
 * @param {Array} x an array
 * @param {Array} y permutation?
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {boolean}
 */
function isPermutationOn(x, y, fn=null, ths=null) {
  var fn = fn||id;
  var x1 = x.map(fn, ths).sort();
  var y1 = y.map(fn, ths).sort();
  return isSubsequence(x1, y1);
}
/**
 * Checks if array starts with a prefix.
 * @param {Array} x an array
 * @param {Iterable} y prefix?
 * @param {function?} fn compare function (a, b)
 * @returns {boolean}
 */
function isPrefix(x, y, fn=null) {
  var fn = fn||cmp, i = -1;
  for(var v of y)
    if(fn(x[++i], v)!==0) return false;
  return true;
}
/**
 * Checks if array starts with a prefix.
 * @param {Array} x an array
 * @param {Iterable} y prefix?
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {boolean}
 */
function isPrefixOn(x, y, fn=null, ths=null) {
  var fn = fn||id, i = -1;
  for(var v of y) {
    var u1 = fn.call(ths, x[++i], i, x);
    var v1 = fn.call(ths, v, i, y);
    if(u1!==v1) return false;
  }
  return true;
}
/**
 * Checks if array has a subsequence.
 * @param {Iterable} x an array
 * @param {Array} y subsequence?
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {boolean}
 */
function isSubsequenceOn(x, y, fn=null, ths=null) {
  var fn = fn||id, i = -1;
  var j = 0, J = y.length;
  var y1 = y.map(fn, ths);
  for(var u of x) {
    var u1 = fn.call(ths, u, ++i, x);
    if(u1===y1[j] && (++j)===J) return true;
  }
  return false;
}
/**
 * Checks if array ends with a suffix.
 * @param {Array} x an array
 * @param {Iterable} y suffix?
 * @param {function?} fn compare function (a, b)
 * @returns {boolean}
 */
function isSuffix(x, y, fn=null) {
  var fn = fn||cmp, i = x.length-y.length-1;
  for(var v of y)
    if(fn(x[++i], v)!==0) return false;
  return true;
}
/**
 * Checks if array ends with a suffix.
 * @param {Array} x an array
 * @param {Iterable} y suffix?
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {boolean}
 */
function isSuffixOn(x, y, fn=null, ths=null) {
  var fn = fn||id, i = x.length-y.length-1, j = -1;
  for(var v of y) {
    var u1 = fn.call(ths, x[++i], i, x);
    var v1 = fn.call(ths, v, ++j, y);
    if(u1!==v1) return false;
  }
  return true;
}
/**
 * Checks if there are no duplicate values.
 * @param {Array} x an array
 * @param {function?} fn compare function (a, b)
 * @returns {boolean}
 */
function isUnique(x, fn=null) {
  var fn = fn||cmp;
  for(var i=0, I=x.length; i<I; i++) {
    for(var j=0; j<i; j++)
      if(fn(x[i], x[j])===0) return false;
  }
  return true;
}
/**
 * Checks if there are no duplicate values.
 * @param {Array} x an array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {boolean}
 */
function isUniqueOn(x, fn=null, ths=null) {
  var fn = fn||id;
  for(var i=0, I=x.length; i<I; i++) {
    var u = fn.call(ths, x[i], i, x);
    for(var j=0; j<i; j++) {
      var v = fn.call(ths, x[j], j, x);
      if(u===v) return false;
    }
  }
  return true;
}
/**
 * Gets length of part of array.
 * @param {Array} x an array
 * @param {number?} i start index (-ve: from right) (0)
 * @param {number?} I end index (-ve: from right) (end)
 * @returns {number}
 */
function length(x, i=0, I=x.length) {
  var [i, I] = indexRange(x, i, I);
  return I-i;
}
/**
 * Updates values based on map function.
 * @param {Array} x an array
 * @param {function} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array}
 */
function map(x, fn, ths=null) {
  return x.map(fn, ths);
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
 * Finds largest value.
 * @param {Iterable} x an array
 * @param {function?} fn compare function (a, b)
 * @returns {*}
 */
function max(x, fn=null) {
  var fn = fn||cmp, m = x[0];
  for(var v of x)
    if(fn(v, m)>0) m = v;
  return m;
}
/**
 * Finds largest value.
 * @param {Iterable} x an array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {*}
 */
function maxOn(x, fn=null, ths=null) {
  var fn = fn||id, i = -1;
  var mk = fn.call(ths, x[0], 0, x), mv = x[0];
  for(var v of x) {
    var k = fn.call(ths, v, ++i, x);
    if(k>mk) { mk = k; mv = v; }
  }
  return mv;
}
/**
 * Finds smallest value.
 * @param {Iterable} x an array
 * @param {function?} fn compare function (a, b)
 * @returns {*}
 */
function min(x, fn=null) {
  var fn = fn||cmp, m = x[0];
  for(var v of x)
    if(fn(v, m)<0) m = v;
  return m;
}
/**
 * Finds smallest value.
 * @param {Iterable} x an array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {*}
 */
function minOn(x, fn=null, ths=null) {
  var fn = fn||id, i = -1;
  var mk = fn.call(ths, x[0], 0, x), mv = x[0];
  for(var v of x) {
    var k = fn.call(ths, v, ++i, x);
    if(k<mk) { mk = k; mv = v; }
  }
  return mv;
}
/**
 * Segregates array keeping similar values together.
 * @param {Iterable} x an array
 * @param {function} fn test function (v, i, x)
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
 * Segregates array keeping similar values together.
 * @param {Iterable} x an array
 * @param {function} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Map<any, Array>} {key => values}
 */
function partitionOn(x, fn=null, ths=null) {
  var fn = fn||id;
  var m = new Map(), i = -1;
  for(var v of x) {
    var v1 = fn.call(ths, v, ++i, x);
    if(!m.has(v1)) m.set(v1, []);
    m.get(v1).push(v);
  }
  return m;
}
/**
 * Picks an arbitrary permutation.
 * @param {Array} x an array (updated)
 * @param {number?} n number of values (-1 => any)
 * @param {number?} r random seed 0->1
 * @returns {Array} x
 */
function permutation$(x, n=-1, r=Math.random()) {
  if(n>x.length) return x;
  var X = x.length, rnd = random(r);
  var n = n>=0? n:Math.floor((X+1)*rnd());
  for(var i=0; i<n; i++) {
    var j = i+Math.floor((X-i)*rnd());
    var t = x[i]; x[i] = x[j]; x[j] = t;
  }
  x.length = n;
  return x;
}
/**
 * Picks an arbitrary permutation.
 * @param {Array} x an array
 * @param {number?} n number of values (-1 => any)
 * @param {number?} r random seed 0->1
 * @returns {Array}
 */
function permutation(x, n=-1, r=Math.random()) {
  if(n>x.length) return null;
  return permutation$(x.slice(), n, r);
}
/**
 * Removes or replaces existing values.
 * @param {Array} x an array
 * @param {number} i remove index
 * @param {number?} n number of values to remove (rest)
 * @param {...any} vs values to insert
 * @returns {Array<Array>} [removed, array]
 */
function splice(x, i, n=x.length-i, ...vs) {
  var r = x.slice(i, i+n);
  var u = concat$(x.slice(0, i), vs, x.slice(i+n));
  return [r, u];
}
function* permutationsOf(x, n) {
  if(x.length===0 || n===0) { yield []; return; }
  for(var i=x.length-1; i>=0; i--) {
    var y = splice(x, i, 1)[1];
    for(var p of permutationsOf(y, n-1)) {
      p.push(x[i]);
      yield p;
    }
  }
}

/**
 * Lists all possible permutations.
 * @param {Array} x an array
 * @param {number?} n number of values (-1 => any)
 * @returns {Iterable<Array>} ...permutations
 */
function* permutations(x, n=-1) {
  if(n>x.length) return;
  for(var i=n<0? 0:n, I=n<0? x.length:n; i<=I; i++)
    yield* permutationsOf(x, i);
}
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
/**
 * Picks an arbitrary prefix.
 * @param {Array} x an array
 * @param {number?} n number of values (-1 => any)
 * @param {number?} r random seed 0->1
 * @returns {Array}
 */
function prefix(x, n=-1, r=Math.random()) {
  var X = x.length, rnd = random(r);
  var n = n>=0? n:Math.floor((X+1)*rnd());
  return n>X? null:x.slice(0, n);
}
/**
 * Finds smallest and largest values.
 * @param {Iterable} x an array
 * @param {function?} fn compare function (a, b)
 * @returns {Array} [min, max]
 */
function range(x, fn=null) {
  var fn = fn||cmp, m = x[0], n = m;
  for(var v of x) {
    if(fn(v, m)<0) m = v;
    if(fn(v, n)>0) n = v;
  }
  return [m, n];
}
/**
 * Finds smallest and largest values.
 * @param {Iterable} x an array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array} [min, max]
 */
function rangeOn(x, fn=null, ths=null) {
  var fn = fn||id, i = -1;
  var mk = fn.call(ths, x[0], 0, x), mv = x[0];
  var nk = mk, nv = mv;
  for(var v of x) {
    var k = fn.call(ths, v, ++i, x);
    if(k<mk) { mk = k; mv = v; }
    if(k>nk) { nk = k; nv = v; }
  }
  return [mv, nv];
}
/**
 * Repeats an array given times.
 * @param {Array} x an array
 * @param {number} n times
 * @returns {Array}
 */
function repeat(x, n) {
  for(var a=[];n>0; n--)
    concat$(a, x);
  return a;
}
/**
 * Reverses the values.
 * @param {Array} x an array
 * @returns {Array} reversed
 */
function reverse(x) {
  return x.slice().reverse();
}
/**
 * Gets remainder of x/y with sign of y (floored division).
 * @param {number} x dividend
 * @param {number} y divisor
 * @returns {number}
 */
function mod(x, y) {
  return x - y*Math.floor(x/y);
}
/**
 * Rotates values in array.
 * @param {Array} x an array (updated)
 * @param {number} n rotate amount (-ve: left, +ve: right)
 * @returns {Array} x
 */
function rotate$(x, n) {
  var n = mod(n, x.length);
  var y = x.slice(-n);
  x.copyWithin(n, 0);
  return copy$(x, y);
}
/**
 * Rotates values in array.
 * @param {Array} x an array
 * @param {number} n rotate amount (-ve: left, +ve: right)
 * @returns {Array}
 */
function rotate(x, n) {
  return rotate$(x.slice(), n);
}
/**
 * Searches a value throughout.
 * @param {Array} x an array
 * @param {*} v search value
 * @param {function?} fn compare function (a, b)
 * @returns {Array<number>} indices of value
 */
function searchAll(x, v, fn=null) {
  var fn = fn||cmp, a = [];
  for(var i=0, I=x.length; i<I; i++)
    if(fn(x[i], v)===0) a.push(i);
  return a;
}
/**
 * Searches a value from left.
 * @param {Array} x an array
 * @param {*} v search value
 * @param {function?} fn compare function (a, b)
 * @returns {number} index of value, -1 if not found
 */
function search(x, v, fn=null) {
  var fn = fn||cmp;
  for(var i=0, I=x.length; i<I; i++)
    if(fn(x[i], v)===0) return i;
  return -1;
}
/**
 * Searches a value from right.
 * @param {Array} x an array
 * @param {*} v search value
 * @param {function?} fn compare function (a, b)
 * @returns {number} index of value, -1 if not found
 */
function searchRight(x, v, fn=null) {
  var fn = fn||cmp;
  for(var i=x.length-1; i>=0; i--)
    if(fn(x[i], v)===0) return i;
  return -1;
}
/**
 * Sets value at index.
 * @param {Array} x an array
 * @param {number} i index (-ve: from right)
 * @param {*} v value
 * @returns {Array}
 */
function set(x, i, v) {
  return splice(x, index(x, i), 1, v)[1];
}
/**
 * Sets value at index.
 * @param {Array} x an array (updated)
 * @param {number} i index (-ve: from right)
 * @param {*} v value
 * @returns {Array} x
 */
function set$(x, i, v) {
  x[index(x, i)] = v;
  return x;
}
/**
 * Gets a part of array.
 * @param {Array} x an array
 * @param {number?} i start index (0)
 * @param {number?} I end index (end)
 * @returns {Array}
 */
function slice(x, i=0, I=x.length) {
  return x.slice(i, I);
}
/**
 * Gets a part of array.
 * @param {Array} x an array (updated)
 * @param {number?} i start index (0)
 * @param {number?} I end index (end)
 * @returns {Array} x
 */
function slice$(x, i=0, I=x.length) {
  x.copyWithin(0, i, I);
  x.length = length(x, i, I);
  return x;
}
/**
 * Arranges values in an order.
 * @param {Array} x an array (updated)
 * @param {function?} fn compare function (a, b)
 * @returns {Array} x
 */
function sort$(x, fn=null) {
  return x.sort(fn||cmp);
}
/**
 * Arranges values in an order.
 * @param {Array} x an array
 * @param {function?} fn compare function (a, b)
 * @returns {Array}
 */
function sort(x, fn=null) {
  return sort$(x.slice(), fn);
}
/**
 * Arranges values in an order.
 * @param {Array} x an array (updated)
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array} x
 */
function sortOn$(x, fn=null, ths=null) {
  if(!fn) return x.sort(cmp);
  var m = new Map(), i = -1;
  for(var v of x)
    m.set(v, fn.call(ths, v, ++i, x));
  return x.sort((a, b) => cmp(m.get(a), m.get(b)));
}
/**
 * Arranges values in an order.
 * @param {Array} x an array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array}
 */
function sortOn(x, fn=null, ths=null) {
  return sortOn$(x.slice(), fn, ths);
}
/**
 * Removes or replaces existing values.
 * @param {Array} x an array (updated)
 * @param {number} i remove index
 * @param {number?} n number of values to remove (rest)
 * @param {...any} vs values to insert
 * @returns {Array} removed
 */
function splice$(x, i, n=x.length-i, ...vs) {
  return x.splice(i, n, ...vs);
}
/**
 * Breaks array considering test as separator.
 * @param {Array} x an array
 * @param {function} fn test function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array<Array>} [...pieces]
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
/**
 * Returns evenly spaced values within given interval.
 * @param {number} v start of interval
 * @param {number} V end of interval (excluding)
 * @param {number?} stp spacing between values (1)
 * @returns {Array}
 */
function arange(v, V, stp=1) {
  var a = [];
  if(stp>0) for(; v<V; v+=stp) a.push(v);
  else for(; v>V; v+=stp) a.push(v);
  return a;
}
function subsequenceNum(x, n, r) {
  var is = arange(0, x.length);
  permutation$(is, n, r).sort();
  return getAll(x, is);
}

function subsequenceAny(x, r) {
  var rnd = random(r), a = [];
  for(var v of x)
    if(rnd()>=0.5) a.push(v);
  return a;
}

/**
 * Picks an arbitrary subsequence.
 * @param {Array} x an array
 * @param {number?} n number of values (-1 => any)
 * @param {number?} r random seed 0->1
 * @returns {Array}
 */
function subsequence(x, n=-1, r=Math.random()) {
  var X = x.length;
  if(n>=0) return n>X? null:subsequenceNum(x, n, r);
  return subsequenceAny(x, r);
}
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
/**
 * Lists all possible suffixes.
 * @param {Array} x an array
 * @param {number?} n number of values (-1 => any)
 * @returns {Iterable<Array>} ...suffixes
 */
function* suffixes(x, n=-1) {
  if(n>=0) { yield x.slice(x.length-n); return; }
  for(var i=0, I=x.length; i<=I; i++)
    yield x.slice(i);
}
/**
 * Picks an arbitrary suffix.
 * @param {Array} x an array
 * @param {number?} n number of values (-1 => any)
 * @param {number?} r random seed 0->1
 * @returns {Array}
 */
function suffix(x, n=-1, r=Math.random()) {
  var X = x.length, rnd = random(r);
  var n = n>=0? n:Math.floor((X+1)*rnd());
  return n>X? null:x.slice(-n);
}
/**
 * Exchanges two values.
 * @param {Array} x an array (updated)
 * @param {number} i an index
 * @param {number} j another index
 * @returns {Array} x
 */
function swap$(x, i, j) {
  var i = index(x, i), j = index(x, j);
  var t = x[i]; x[i] = x[j]; x[j] = t;
  return x;
}
/**
 * Exchanges two values.
 * @param {Array} x an array
 * @param {number} i an index
 * @param {number} j another index
 * @returns {Array}
 */
function swap(x, i, j) {
  return swap$(x.slice(), i, j);
}
/**
 * Gives values present in any array.
 * @param {Array} x an array (updated)
 * @param {Iterable} y another array
 * @param {function?} fn compare function (a, b)
 * @returns {Array} x
 */
function union$(x, y, fn=null) {
  var fn = fn||cmp;
  y: for(var v of y) {
    for(var u of x)
      if(fn(u, v)===0) continue y;
    x.push(v);
  }
  return x;
}
/**
 * Gives values present in any array.
 * @param {Array} x an array
 * @param {Iterable} y another array
 * @param {function?} fn compare function (a, b)
 * @returns {Array}
 */
function union(x, y, fn=null) {
  return union$(x.slice(), y, fn);
}
/**
 * Gives values present in any array.
 * @param {Array} x an array (updated)
 * @param {Iterable} y another array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array} x
 */
function unionOn$(x, y, fn=null, ths=null) {
  var s = uniques(x, fn, ths);
  var fn = fn||id, i = -1;
  for(var v of y) {
    var v1 = fn.call(ths, v, ++i, y);
    if(!s.has(v1)) { x.push(v); s.add(v1); }
  }
  return x;
}
/**
 * Gives values present in any array.
 * @param {Array} x an array
 * @param {Iterable} y another array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array}
 */
function unionOn(x, y, fn=null, ths=null) {
  return unionOn$(x.slice(), y, fn, ths);
}
/**
 * Removes duplicate values.
 * @param {Iterable} x an array
 * @param {function?} fn compare function (a, b)
 * @returns {Array}
 */
function unique(x, fn=null) {
  return union$([], x, fn);
}
/**
 * Removes duplicate values.
 * @param {Iterable} x an array
 * @param {function?} fn map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array}
 */
function uniqueOn(x, fn=null, ths=null) {
  if(!fn) return Array.from(new Set(x));
  return unionOn$([], x, fn, ths);
}
/**
 * Gives passed values as array.
 * @param  {...any} vs values
 * @returns {Array}
 */
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
exports.bsearchAny = bsearchAny;
exports.bsearchClosest = bsearchClosest;
exports.bsearch = bsearch;
exports.bsearchRight = bsearchRight;
exports.chunk = chunk;
exports.compare = compare;
exports.concat = concat;
exports.concat$ = concat$;
exports.copy = copy;
exports.copy$ = copy$;
exports.count = count;
exports.countOn = countOn;
exports.cut = cut;
exports.cutRight = cutRight;
exports.cycle = cycle;
exports.difference = difference;
exports.differenceOn = differenceOn;
exports.fill = fill;
exports.fill$ = fill$;
exports.filter = filter;
exports.filter$ = filter$;
exports.find = find;
exports.findIndex = findIndex;
exports.findIndices = findIndices;
exports.findRight = findRight;
exports.flat = flat;
exports.getAll = getAll;
exports.get = get;
exports.getLerp = getLerp;
exports.group = group;
exports.groupOn = groupOn;
exports.index = index;
exports.indexRange = indexRange;
exports.infixes = infixes;
exports.infix = infix;
exports.interleave = interleave;
exports.intersection = intersection;
exports.intersectionOn = intersectionOn;
exports.isDisjoint = isDisjoint;
exports.isDisjointOn = isDisjointOn;
exports.isEqual = isEqual;
exports.isInfix = isInfix;
exports.isInfixOn = isInfixOn;
exports.is = exports47;
exports.isPermutation = isPermutation;
exports.isPermutationOn = isPermutationOn;
exports.isPrefix = isPrefix;
exports.isPrefixOn = isPrefixOn;
exports.isSubsequence = isSubsequence;
exports.isSubsequenceOn = isSubsequenceOn;
exports.isSuffix = isSuffix;
exports.isSuffixOn = isSuffixOn;
exports.isUnique = isUnique;
exports.isUniqueOn = isUniqueOn;
exports.length = length;
exports.map = map;
exports.map$ = map$;
exports.max = max;
exports.maxOn = maxOn;
exports.min = min;
exports.minOn = minOn;
exports.partition = partition;
exports.partitionOn = partitionOn;
exports.permutation = permutation;
exports.permutation$ = permutation$;
exports.permutations = permutations;
exports.prefixes = prefixes;
exports.prefix = prefix;
exports.range = range;
exports.rangeOn = rangeOn;
exports.repeat = repeat;
exports.reverse = reverse;
exports.rotate = rotate;
exports.rotate$ = rotate$;
exports.searchAll = searchAll;
exports.search = search;
exports.searchRight = searchRight;
exports.set = set;
exports.set$ = set$;
exports.slice = slice;
exports.slice$ = slice$;
exports.sort = sort;
exports.sort$ = sort$;
exports.sortOn = sortOn;
exports.sortOn$ = sortOn$;
exports.splice = splice;
exports.splice$ = splice$;
exports.split = split;
exports.subsequence = subsequence;
exports.subsequences = subsequences;
exports.suffixes = suffixes;
exports.suffix = suffix;
exports.swap = swap;
exports.swap$ = swap$;
exports.union = union;
exports.union$ = union$;
exports.unionOn = unionOn;
exports.unionOn$ = unionOn$;
exports.unique = unique;
exports.uniqueOn = uniqueOn;
exports.zip = zip;
