// get, set, set$

/**
 * Gets true index to source (+ve).
 * @param {Array} x source
 * @param {number} i index
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
  return equals(xa, ya);
}



// equals
function splice(x, i, n=1, ...vs) {
  var a = x.slice(0, i);
  for(var v of vs)
    a.push(v);
  for(var i=i+n, I=x.length; i<I; i++)
    a.push(x[i]);
  return a;
}
