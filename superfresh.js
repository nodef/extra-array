/**
 * Gets true index to source (+ve).
 * @param {Array} x source
 * @param {number} i index
 * @returns {number} +ve index
 */
function index(x, i) {
  return i<0? x.length-i:i;
}

/**
 * Gets value at index (+ve, -ve).
 * @param {Array} x source
 * @param {number} i index (-ve: from right)
 * @returns {*} value
 */
function get(x, i) {
  return x[index(x, i)];
}

/**
 * Sets value at index (+ve, -ve).
 * @param {Array} x source
 * @param {number} i index (-ve: from right)
 * @param {*} v value
 * @returns {Array} set array
 */
function set(x, i, v) {
  return splice(x, index(x, i), 1, v);
}

/**
 * Sets value at index (+ve, -ve)!
 * @param {Array} x target (modified!)
 * @param {number} i index (-ve: from right)
 * @param {*} v value
 * @returns {Array} target
 */
function set$(x, i, v) {
  x[index(x, i)] = v;
  return x;
}

/**
 * Gets first value.
 * @param {Array} x source
 * @returns {*} first value
 */
function head(x) {
  return x[0];
}

/**
 * Gets values except first.
 * @param {Array} x source
 * @returns {Array} except first
 */
function tail(x) {
  return x.slice(1);
}

/**
 * Gets values except last.
 * @param {Array} x source
 * @returns {Array} except last
 */
function init(x) {
  return x.slice(0, -1);
}

/**
 * Gets last value.
 * @param {Array} x source
 * @returns {*} last value
 */
function last(x) {
  return x[x.length-1];
}
