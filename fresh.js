// PURE FUNCTIONS
// - behave like math functions
// - dont manipulate input arrays
/**
 * Gets first element.
 * @param {Array} x array
 * @returns {*} first element
 */
function head(x) {
  return x[0];
}

/**
 * Gets last element.
 * @param {Array} x array
 * @returns {*} last element
 */
function last(x) {
  return x[x.length-1];
}

/**
 * Gets elements before last element.
 * @param {Array} x array
 * @returns {Array} elements before last
 */
function init(x) {
  return x.slice(0, -1);
}

/**
 * Gets elements after head.
 * @param {Array} x array
 * @returns {Array} elements after head
 */
function tail(x) {
  return x.slice(1);
}

/**
 * Gets all initial segments.
 * @param {Array} x array
 * @returns {Array} [initial segment ...]
 */
function inits(x) {
  var a = [];
  for(var i=0, I=x.length; i<I; i++)
    a.push(x.slice(0, i));
  return a;
}

/**
 * Gets all final segments.
 * @param {Array} x array
 * @returns {Array} [final segment ...]
 */
function tails(x) {
  var a = [];
  for(var i=0, I=x.length; i<I; i++)
    a.push(x.slice(i));
  return a;
}

/**
 * Gets largest element, as per compare function.
 * @param {Array} x array
 * @param {function?} fn compare function (a, b)
 * @returns {*} largest element
 */
function max(x, fn) {
  if(!fn) return Math.max.apply(null, x);
  var a = undefined;
  for(var e of x)
    a = fn(a, e)<0? e:a;
  return a;
}

/**
 * Gets least element, as per compare function.
 * @param {Array} x array
 * @param {function?} fn compare function (a, b)
 * @returns {*} least element
 */
function min(x, fn) {
  if(!fn) return Math.min.apply(null, x);
  var a = undefined;
  for(var e of x)
    a = fn(a, e)<0? a:e;
  return a;
}

/**
 * Gets prefix of desired length.
 * @param {Array} x array
 * @param {number} n prefix length
 * @returns {Array} prefix
 */
function take(x, n) {
  return x.slice(0, n);
}

/**
 * Gets elements after prefix.
 * @param {Array} x array
 * @param {number} n prefix length
 * @returns {Array} suffix
 */
function drop(x, n) {
  return x.slice(n);
}

/**
 * Gets longest prefix that satisfies filter.
 * @param {Array} x array
 * @param {function} fn filter function (elem, index, array)
 * @param {object?} ths this argument
 * @returns {Array} prefix
 */
function takeWhile(x, fn, ths=null) {
  return x.slice(0, findFailIndex(x, fn, ths));
}

/**
 * Get suffix remaining after takeWhile().
 * @param {Array} x array
 * @param {function} fn filter function (elem, index, array)
 * @param {object?} ths this argument
 * @returns {Array} suffix
 */
function dropWhile(x, fn, ths=null) {
  return x.slice(findFailIndex(x, fn, ths));
}

function findFailIndex(x, fn, ths=null) {
  var i = -1;
  for(var e of x)
    if(!fn.call(ths, e, ++i, x)) break;
  return i;
}

/**
 * Splits array to elements which do, and dont satify the filter.
 * @param {Array} x array
 * @param {function} fn filter function (elem, index, array)
 * @param {object?} ths this argument
 * @returns {Array} pair of arrays [satisfy, dont_satisfy]
 */
function partition(x, fn, ths=null) {
  var t = [], f = [], i = -1;
  for(var e of x) {
    if(fn.call(ths, e, ++i, x)) t.push(e);
    else f.push(e);
  }
  return [t, f];
}

/**
 * Combines values from n arrays, with a function.
 * @param {Array} xs n arrays
 * @param {function} fn combine function (a, b, c, ...)
 * @param {object?} ths this argument
 * @returns {Array} combined values
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
function args() {
  return arguments;
}



// IMPURE FUNCTIONS
// - dont behave like math functions
// - manipulate input arrays

function cons() {

}

function uncons() {
  
}

// zip?
function transpose() {

}

function foldl() {

}

function foldr() {

}

function scanl() {
  
}

function scanr() {

}

function unfoldr(e, fn, ths=null) {
  var a = [], i = -1;
  while(true) {
    var p = fn.call(ths, e, ++i, a);
    if(p===undefined) return a;
    a.push(p[0]);
    e = p[1];
  }
}

function splitAt(x, i) {
  return [x.slice(0, i), x.slice(i)];
}

// concat$
function dropWhileEnd(x, fn, ths=null) {
  var i = x.findLastNotIndex(x, fn, ths);
  return x.slice(0, i+1);
}

// splitAt / breka?
function span(x, fn, ths=null) {
  var i = x.findNotIndex(x, fn, ths);
  return [x.slice(0, i), x.slice(i)];
}

function breaks(x, fn, ths=null) {
  var i = x.findIndex(x, fn, ths);
  return [x.slice(0, i), x.slice(i)];
}

function stripPrefix(x, y) {
  if(!isPrefixOf(x, y)) return null;
  return x.slice(y.length);
}

function group(x) {
  var a = [], b = [];
  for(var e of x) {
    if(e===last(b)) b.push(e);
    else { a.push(b); b = []; }
  }
  if(b.length) a.push(b);
  return a;
}

/**
 * Removes duplicate elements.
 * @param {Array} x array
 * @param {function} fn compare function (a, b)
 * @returns {Array} unique element array
 */
function nub(x, fn) {
  var a = [];
  x: for(var e of x) {
    for(var f of a)
      if(fn(e, f)===0) continue x;
    a.push(e);
  }
  return a;
}

/**
 * Inserts a value to an ordered array.
 * @param {Array} x array
 * @param {*} e element to insert
 * @param {function} fn compare function (a, b)
 */
function insert(x, e, fn) {
  var i = x.findIndex(f => fn(e, f)>=0);
  x.splice(i, 0, e);
  return x;
}

/**
 * Deletes frist occurrence of an element.
 * @param {Array} x array
 * @param {*} e element to delete
 * @param {function} fn compare function (a, b)
 */
function remove(x, e, fn) {
  var i = x.findIndex(f => fn(e, f)===0);
  x.splice(i, 1);
  return x;
}


exports.head = head;
exports.last = last;
exports.init = init;
exports.tail = tail;
exports.inits = inits;
exports.tails = tails;
exports.permutations = permutations;
exports.subsequences = subsequences;
exports.max = max;
exports.min = min;
exports.take = take;
exports.drop = drop;
exports.takeWhile = takeWhile;
exports.dropWhile = dropWhile;
exports.partition = partition;
exports.zip = zip;
exports.append = append;
