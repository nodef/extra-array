function modp(m, n) {
  return (m % n + n) % n;
}
module.exports = modp;
