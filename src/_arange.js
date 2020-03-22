/**
 * Returns evenly spaced values within given interval.
 * @param {number} v start of interval
 * @param {number} V end of interval (excluding)
 * @param {number?} stp spacing between values (1)
 * @returns {Array}
 */
function arange(v, V, stp=1) {
  var a = [];
  if(stp>0) for(; v<V; v+=stp) a.push(v);
  else for(; v>V; v+=stp) a.push(v);
  return a;
}
module.exports = arange;
