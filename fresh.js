/**
 * Gets first element of array.
 * @param {array} x array
 * @returns {*} first element
 */
function head(x) {
  return x[0];
}

/**
 * Gets last element of array.
 * @param {array} x array
 * @returns {*} last element
 */
function last(x) {
  return x[x.length-1];
}

/**
 * Gets elements after head of array.
 * @param {array} x array
 * @returns {array} elements after head
 */
function tail(x) {
  return x.slice(1);
}

/**
 * Gets elements before last element of array.
 * @param {array} x array
 * @returns {array} elements before last
 */
function init(x) {
  return x.slice(0, -1);
}

/**
 * Gets largest element, as per compare function.
 * @param {array} x array
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
 * Combines values from n arrays, with a function.
 * @param {array} xs n arrays
 * @param {function} fn combiner (a, b, c, ...)
 * @param {object?} ths this argument
 * @returns {array} combined values
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
exports.head = head;
exports.last = last;
exports.tail = tail;
exports.init = init;
exports.max = max;
exports.zip = zip;
