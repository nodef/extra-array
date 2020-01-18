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
 * Returns corresponding values from n arrays.
 * @param {array} xs n arrays
 * @returns {array} array of corresponding values
 */
function zip(xs) {
  return zipWith(xs ,args);
}

/**
 * Combines values from n arrays, with a function.
 * @param {array} xs n arrays
 * @param {function} fn combiner (a, b, c, ...)
 * @param {object?} ths this argument
 * @returns {array} combined values
 */
function zipWith(xs, fn, ths=null) {
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
exports.zip = zip;
exports.zipWith = zipWith;
