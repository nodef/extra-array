/**
 * Gives positive modulus.
 * @param {number} m dividend
 * @param {number} n divisor
 * @returns {number} m % n
 */
function modp(m, n) {
  return (m % n + n) % n;
}
module.exports = modp;
