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
/**
 * Appends arrays to end of input array!
 * @param {Array} x input array
 * @param  {...array} ys arrays to append
 * @returns input array (modified!)
 */
function append(x, ...ys) {
  for(var y of ys)
    Array.prototype.push.apply(x, y);
  return x;
}

exports.head = head;
exports.last = last;
exports.init = init;
exports.tail = tail;
exports.inits = inits;
exports.tails = tails;
exports.max = max;
exports.min = min;
exports.take = take;
exports.drop = drop;
exports.takeWhile = takeWhile;
exports.dropWhile = dropWhile;
exports.partition = partition;
exports.zip = zip;
exports.append = append;
