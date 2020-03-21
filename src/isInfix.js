const isInfixBy = require('./isInfixBy');
const isInfixOn = require('./isInfixOn');

/**
 * Checks if array contains an infix.
 * @param {Array} x an array
 * @param {Array} y infix?
 * @param {function?} fc compare function (a, b)
 * @param {function?} fm map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {boolean}
 */
function isInfix(x, y, fc=null, fm=null, ths=null) {
  if(fm) return isInfixOn(x, y, fm, ths);
  return isInfixBy(x, y, fc);
}
module.exports = isInfix;
