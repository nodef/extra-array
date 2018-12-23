function repeatTo(arr, n=1, bgn=0, end=arr.length, z=[], z0=z.length) {
  for(var h=0; h<n; h++) {
    for(var i=bgn; i<end; i++)
      z[z0++] = arr[i];
  }
  return z;
};
module.exports = repeatTo;
