/**
 * Gets last value.
 * @param x an array
 * @param vd default value
 */
function last<T>(x: T[], vd?: T): T {
  return x.length>0? x[x.length-1] : vd;
}
export default last;
