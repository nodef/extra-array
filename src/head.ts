/**
 * Gets first value.
 * @param x an array
 * @param vd default value
 */
function head<T>(x: T[], vd?: T): T {
  return x.length>0? x[0] : vd;
}
export default head;
