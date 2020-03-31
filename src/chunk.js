/**
 * Breaks array into chunks of given size.
 * @param {Array} x an array
 * @param {number?} n chunk size (1)
 * @returns {Array<Array>} chunks
 */
function chunk(x, n=1) {
  var a = [];
  for(var i=0, I=x.length; i<I; i+=n)
    a.push(x.slice(i, i+n));
  return a;
}
module.exports = chunk;

