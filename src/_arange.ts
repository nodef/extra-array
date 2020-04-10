/**
 * Returns evenly spaced values within given interval.
 * @param v start of interval
 * @param V end of interval (excluding)
 * @param stp spacing between values (1)
 */
function arange(v: number, V: number, stp: number=1): number[] {
  var a = [];
  if(stp>0) for(; v<V; v+=stp) a.push(v);
  else for(; v>V; v+=stp) a.push(v);
  return a;
}
export default arange;
