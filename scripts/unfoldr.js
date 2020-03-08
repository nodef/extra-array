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
module.exports = unfoldr;
