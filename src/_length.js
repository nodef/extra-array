const region = require('./_region');

function length(x, i, I) {
  var [i, I] = region(x, i, I);
  return I-i;
}
module.exports = length;
