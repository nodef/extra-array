function equalTo(a, b, a0=0, a1=a.length, b0=0, b1=b.length) {
  if(a1-a0!==b1-b0) return false;
  for(var i=0, I=a1-a0; i<I; i++)
    if(a[a0+i]!==b[b0+i]) return false;
  return true;
};
module.exports = equalTo;
