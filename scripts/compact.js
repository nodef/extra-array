function compactTo(arr, bgn=0, end=arr.length, z=[], z0=z.length) {
  for(var i=bgn; i<end; i++)
    if(arr[i]) z[z0++] = arr[i];
  return z;
};
module.exports = compactTo;
