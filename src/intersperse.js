/**
 * Places separator between each element in array.
 * @param {Array} x an array
 * @param {*} v separator value
 * @returns {Array} [x0 v x1 v ...]
 */
function intersperse(x, v) {
  var a = [];
  for(var w of x)
    a.push(w, v);
  a.pop();
  return a;
}
module.exports = intersperse;
