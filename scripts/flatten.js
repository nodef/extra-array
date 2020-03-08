function flattenTo(a, x, dep) {
  for(var v of x) {
    if(dep!==0 && Array.isArray(v)) flattenTo(a, v, dep-1);
    else a.push(v);
  }
  return a;
}

/**
 * Flatten nested array to given depth.
 * @param {Array} x a nested array
 * @param {number} dep maximum depth
 */
function flatten(x, dep=-1) {
  return flattenTo([], x, dep);
}
module.exports = flatten;
