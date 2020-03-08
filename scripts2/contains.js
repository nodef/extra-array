const equalTo = require('./equal');
function containsIt(a, b, a0=0, a1=a.length, b0=0, b1=b.length) {
  for(i=a0, L=b1-b0, I=a1-L+1; i<I; i++)
    if(equalTo(a, b, i, i+L, b0, b1)) return true;
  return false;
};
module.exports = containsIt;
