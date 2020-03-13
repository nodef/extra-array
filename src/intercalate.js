const concat$ = require('./concat$');

/**
 * Places separator between each array.
 * @param {Array<Array>} xs arrays
 * @param {Array} y separator
 * @returns {Array} [x0 y x1 y ...]
 */
function intercalate(xs, y) {
  var a = [], Y = y.length;
  for(var x of xs)
    concat$(a, x, y);
  a.splice(a.length-Y, Y);
  return a;
}
module.exports = intercalate;
