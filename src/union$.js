const unionBy$ = require('./unionBy$');
const unionOn$ = require('./unionOn$');

/**
 * Gives union of an array with another.
 * @param {Array} x an array (updated)
 * @param {Array} y another array
 * @param {function?} fc compare function (a, b)
 * @param {function?} fm map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array} x
 */
function union$(x, y, fc=null, fm=null, ths=null) {
  if(fm) return unionOn$(x, y, fm, ths);
  return unionBy$(x, y, fc, ths);
}
module.exports = union$;
