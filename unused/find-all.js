function findAll(arr, fn, ths, bgn=0, end=arr.length, z=[], z0=z.length) {
  for(var i=bgn; i<end; i++)
    if(fn.call(ths, arr[i], i, arr)) z[z0++] = arr[i];
  return z;
};
module.exports = findAll;
