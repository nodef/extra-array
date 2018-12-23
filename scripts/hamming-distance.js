function hammingDistance(a, b, a0=0, a1=a.length, b0=0, b1=b.length) {
  var L = a1-a0, z = 0;
  if(L!==b1-b0) return NaN;
  for(var i=0; i<L; i++)
    if(a[a0+i]!==b[b0+i]) z++;
  return z;
};
module.exports = hammingDistance;
