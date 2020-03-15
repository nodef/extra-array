function countAll(arr, bgn=0, end=arr.length, z=new Map()) {
  for(var i=bgn; i<end; i++)
    z.set(arr[i], (z.get(arr[i])||0)+1);
  return z;
};
module.exports = countAll;
