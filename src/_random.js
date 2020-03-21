/**
 * Generates some random values.
 * @param {number} n number of values
 * @param {function?} fn random number generator
 * @param {number?} r random seed
 */
function random(n, fn=null, r=Math.random()) {
  new Array(n).map(fn());
}
// TODO: needed?
