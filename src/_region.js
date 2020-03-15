const index = require('./_index');

function region(x, i, I) {
  return [
    Math.max(index(x, i), 0),
    Math.min(index(x, I), x.length)
  ];
}
module.exports = region;
