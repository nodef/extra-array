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

// ###########################

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


function takel(x, fn) {
  return x.slice();
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
