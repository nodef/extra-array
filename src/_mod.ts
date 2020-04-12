/**
 * Gets remainder of x/y with sign of y (floored division).
 * @param x dividend
 * @param y divisor
 */
function mod(x: number, y: number): number {
  return x - y*Math.floor(x/y);
}
export default mod;
