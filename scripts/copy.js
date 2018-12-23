function copyTo(arr, bgn=0, end=arr.length, z=[], z0=z.length, z1=z0+(end-bgn)) {
  if(z1>z.length) z.length = z1;
  if(arr===z) return z.copyWithin(z0, bgn, end);
  for(var i=bgn; i<end; i++)
    z[z0++] = arr[i];
  return z;
};
module.exports = copyTo;
