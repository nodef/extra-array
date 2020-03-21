const sortOn$ = require('./sortOn$');
const sortBy$ = require('./sortBy$');

/**
 * Arranges values in an order.
 * @param {Array} x an array (updated)
 * @param {function?} fc compare function (a, b)
 * @param {function?} fm map function (v, i, x)
 * @param {object?} ths this argument
 * @returns {Array}
 */
function sort$(x, fc=null, fm=null, ths=null) {
  if(fm) return sortOn$(x, fm, ths);
  return sortBy$(x, fc);
}
module.exports = sort$;
