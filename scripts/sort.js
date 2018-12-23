const binarySearch = require('./binary-search.closest');
function sortTo(arr, fn, ths, bgn=0, end=arr.length, z=[], z0=z.length) {
  var z1 = z0+(end-bgn);
  if(z1>z.length) z.length = z1;
  for(var i=bgn, zi=z0; i<end; i++, zi++) {
    var j = binarySearch(z, arr[i], fn, ths, z0, zi);
    if(j<zi) z.copyWithin(j+1, j, zi);
    z[j] = arr[i];
  }
  return z;
};
module.exports = sortTo;
