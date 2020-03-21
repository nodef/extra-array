function flatTo(a, x, dep) {
  for(var v of x) {
    if(dep!==0 && Array.isArray(v)) flatTo(a, v, dep-1);
    else a.push(v);
  }
  return a;
}

/**
 * Flattens nested array to given depth.
 * @param {Array} x a nested array
 * @param {number?} dep maximum depth (-1)
 * @returns {Array}
 */
function flat(x, dep=-1) {
  return flatTo([], x, dep);
}
module.exports = flat;
