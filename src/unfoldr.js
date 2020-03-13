/**
 * Builds array from a seed value (dual to foldr).
 * @param {function} fn unreduce fn (v, i, x)
 * @param {*} v initial value of accumulator
 * @returns {Array} built array
 */
function unfoldr(fn, v=0) {
  var a = [], i = -1;
  while(true) {
    var r = fn(v, ++i, a);
    if(!r) return a;
    var [w, v] = r;
    a.push(w);
  }
}
module.exports = unfoldr;
