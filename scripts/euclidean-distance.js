function euclideanDistance(a, b, a0=0, a1=a.length, b0=0, b1=b.length) {
  var L=a1-a0, z = 0;
  for(var i=0; i<L; i++)
    z += (a[a0+i]-b[b0+i])**2;
  return Math.sqrt(z);
};
module.exports = euclideanDistance;
